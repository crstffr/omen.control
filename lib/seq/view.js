import Rx from 'rxjs';
import {Font} from '../tools/font';
import {bytes} from '../tools/bytes';
import {PadColors} from '../colors';
import {SeqDevice} from './device';
import {SeqMods} from './mods';

import {ToggleStep, DeleteStep} from '../inst/sequence';
import {DeletePage, DeleteAll} from '../inst/sequence';
import {CURRENT_SEQ, Redraw} from '../inst/sequence';
import {LengthChange} from '../inst/sequence';

import {PageSpeedCycler} from '../inst/sequence';
import {PageRepeatCycler} from '../inst/sequence';
import {PagePlaybackCycler} from '../inst/sequence';

import {InstChannelChange} from '../inst/state';
import {Instruments} from '../inst/collection';

import {SeqElems, SeqPageElems, SeqGridElems} from './elems';

import {MixMods} from '../mix/mods';
import {MixArrowRight, MixArrowLeft} from '../mix/actions';
import {LaunchPadRenderer} from '../class/launchPadRenderer';

let m = MixMods;
let s = SeqMods;
let d = SeqDevice;
let off = PadColors.off;
let red = PadColors.red.low;
let amber = PadColors.amber.low;
let green = PadColors.green.full;

let seq = () => CURRENT_SEQ;
let getI = (val, page) => (64 * (page - 1)) + val;

function filterActive(val, bool) {
    let act = seq().steps[getI(val, seq().page)].active;
    return (bool) ? act : !act;
}

function filterSelected(val, bool) {
    let act = seq().steps[getI(val, seq().page)].selected;
    return (bool) ? act : !act;
}

ToggleStep
    .subscribe(({key, step}) => {
        (step.active) ? key.api.light(amber) : key.api.dark();
    });

DeleteStep
    .subscribe(({key}) => {
        key.api.light(red);
        setTimeout(() => key.api.dark(), 200);
    });

let DeletePageComplete = DeletePage
    .do(page => {
        SeqPageElems
            .filter(({val}) => val === page)
            .forEach(({api}) => api.light(red));
        SeqGridElems
            .filter(() => page === seq().page)
            .forEach(({api}) => api.light(red));
    }).flatMap(() => Rx.Observable.timer(200));

let DeleteAllComplete = DeleteAll
    .do(inst => {
        SeqPageElems.concat(SeqGridElems)
            .filter(() => seq().i === inst)
            .forEach(({api}) => api.light(red));
    }).flatMap(() => Rx.Observable.timer(200));

let ShowInst = new LaunchPadRenderer(d, m, 'channel', InstChannelChange, amber, () => {
    return Font.get(Instruments[seq().i].channel);
});

let ShowLength = new LaunchPadRenderer(d, s, 'length', LengthChange, green, () => {
    let p = seq().getPage();
    return bytes(SeqGridElems.map(e => {
        return (p.temp.a)
            ? [e.x, e.y, e.val === p.temp.a]
            : [e.x, e.y, e.val >= p.start && e.val <= p.end];
    }));
});

let ShowRepeats = new LaunchPadRenderer(d, s, 'repeat', PageRepeatCycler.Change, amber, () => {
    return Font.get(seq().getPage().repeat);
});

let ShowSpeed = new LaunchPadRenderer(d, s, 'speed', PageSpeedCycler.Change, amber, () => {
    return Font.get(seq().getPage().speed);
});

let ShowPlayback = new LaunchPadRenderer(d, s, 'playback', PagePlaybackCycler.Change, amber, () => {
    return Font.get(seq().getPage().playback);
});

Redraw.merge(
    DeletePageComplete,
    DeleteAllComplete,
    ShowInst.Complete,
    ShowSpeed.Complete,
    ShowLength.Complete,
    ShowRepeats.Complete,
    ShowPlayback.Complete,
    )
    .subscribe(() => {

        SeqPageElems
            .filter(({val}) => val !== seq().page)
            .forEach(({api}) => api.dark());

        SeqPageElems
            .filter(({val}) => seq().getPage(val).hasSteps())
            .forEach(({api}) => api.light(amber));

        SeqPageElems
            .filter(({val}) => val === seq().page)
            .forEach(({api}) => api.light(green));

        SeqGridElems
            .filter(({val}) => filterActive(val, true))
            .forEach(({api}) => api.light(amber));

        SeqGridElems
            .filter(({val}) => filterSelected(val, true))
            .forEach(({api}) => api.light(green));

        SeqGridElems
            .filter(({val}) => filterActive(val, false))
            .forEach(({api}) => api.dark());

});


 // This is for capturing grid based shapes (Fonts)

MixMods.subscribe(([name]) => {

    if (name !== 'arm') { return; }
    if (!seq().i) { return; }

    let steps = seq().steps.filter(({page}) => page === seq().page);

    let grid = Array(8).fill().map((v, i) => {
        let start = 8 * i;
        let end = start + 8;
        return steps.slice(start, end).map(({active}) => (active) ? '1' : '0');
    });

    console.log('--------');
    console.log(grid);

});