import Rx from 'rxjs';
import {Font} from '../tools/font';
import {bytes} from '../tools/bytes';
import {PadColors} from '../colors';
import {SeqDevice} from './device';
import {SeqMods, SeqFullPageMods} from './mods';

import {ToggleStep, DeleteStep} from '../inst/sequence';
import {DeletePage, DeleteAll} from '../inst/sequence';
import {CURRENT_SEQ, Redraw} from '../inst/sequence';
import {PlaybackUpdates} from '../inst/sequence';
import {LengthChange} from '../inst/sequence';
import {InstPlayback} from '../inst/playback';
import {Cyclers} from '../inst/sequence';

import {MidiChannelChange, inst} from '../inst/inst';
import {Instruments} from '../inst/collection';

import {SeqElems, SeqPageElems, SeqGridElems} from './elems';

import {MixMods} from '../mix/mods';
import {MixArrowRight, MixArrowLeft} from '../mix/actions';
import {LaunchPadRenderer} from '../class/launchPadRenderer';

let m = MixMods;
let s = SeqMods;
let d = SeqDevice;
let r = PadColors.red;
let a = PadColors.amber;
let g = PadColors.green;

let seq = () => CURRENT_SEQ;
let getI = (val, page) => (64 * (page - 1)) + val;

function filterActive(val, bool) {
    let act = seq().steps[getI(val, seq().page)].notes.size > 0;
    return (bool) ? act : !act;
}

function filterSelected(val, bool) {
    let act = seq().steps[getI(val, seq().page)].selected;
    return (bool) ? act : !act;
}

function filterTied(val, bool) {
    let act = seq().steps[getI(val, seq().page)].tiedto;
    return (bool) ? act : !act;
}

function filterPlaying(val, bool) {
    let i = getI(val, seq().page);
    let step = inst().playbackSteps[InstPlayback.position];
    let act = i === step;
    return (bool) ? act : !act;
}

ToggleStep
    .subscribe(({key, step}) => {
        (step.active) ? key.api.light(a.low) : key.api.dark();
    });

DeleteStep
    .subscribe(({key}) => {
        key.api.light(r.low);
        setTimeout(() => key.api.dark(), 200);
    });

let DeletePageComplete = DeletePage
    .do(page => {
        SeqPageElems
            .filter(({val}) => val === page)
            .forEach(({api}) => api.light(r.low));
        SeqGridElems
            .filter(() => page === seq().page)
            .forEach(({api}) => api.light(r.low));
    }).flatMap(() => Rx.Observable.timer(200));

let DeleteAllComplete = DeleteAll
    .do(inst => {
        SeqPageElems.concat(SeqGridElems)
            .filter(() => seq().i === inst)
            .forEach(({api}) => api.light(r.low));
    }).flatMap(() => Rx.Observable.timer(200));

let ShowInst = new LaunchPadRenderer(d, m, 'channel', MidiChannelChange, a.low, () => {
    return Font.get(Instruments[seq().i].channel);
});

let ShowLength = new LaunchPadRenderer(d, s, 'length', LengthChange, g.full, () => {
    let p = seq().getPage();
    return bytes(SeqGridElems.map(e => {
        return (p.temp.a)
            ? [e.x, e.y, e.val === p.temp.a]
            : [e.x, e.y, e.val >= p.start && e.val <= p.end];
    }));
});

let ShowRepeats = new LaunchPadRenderer(d, s, 'repeat', Cyclers.repeat.change, a.low, () => {
    return Font.get(seq().getPage().repeat);
});

let ShowSpeed = new LaunchPadRenderer(d, s, 'speed', Cyclers.speed.change, a.low, () => {
    return Font.get(seq().getPage().speed);
});

let ShowPlayback = new LaunchPadRenderer(d, s, 'playback', Cyclers.playback.change, a.low, () => {
    return Font.get(seq().getPage().playback);
});


let PlayStep = 0;
let PlayHalt = false;
let PlayStepEmitter;
let PlayStepObservable = Rx.Observable
    .create(e => PlayStepEmitter = e).publish();

PlayStepObservable.connect();

SeqFullPageMods.subscribe(([,bool]) => PlayHalt = bool);

InstPlayback.playObservable.subscribe(() => seq().deselectAllSteps());

InstPlayback.positionObservable
    .filter(() => !PlayHalt)
    .subscribe((pos) => {
        let stepi = inst().playbackSteps[pos];
        let step = seq().getStep(stepi);
        if (step) {
            let page = step.page;
            if (page !== seq().page) {
                seq().page = page;
            }
            if (PlayStep !== stepi) {
                PlayStep = stepi;
                PlayStepEmitter.next(stepi);
            }
        }
    });

PlaybackUpdates.subscribe(() => inst().generatePlayback());

Redraw.merge(
    PlayStepObservable,
    DeletePageComplete,
    DeleteAllComplete,
    ShowInst.Complete,
    ShowSpeed.Complete,
    ShowLength.Complete,
    ShowRepeats.Complete,
    ShowPlayback.Complete,
    InstPlayback.stopObservable)
    .subscribe(() => {

        let tied = new Set();

        SeqPageElems
            .filter(({val}) => val !== seq().page)
            .forEach(({api}) => api.dark());

        SeqPageElems
            .filter(({val}) => seq().getPage(val).hasSteps())
            .forEach(({api}) => api.light(a.low));

        SeqPageElems
            .filter(({val}) => val === seq().page)
            .forEach(({api}) => api.light(a.full));

        SeqGridElems
            .filter(({val}) => filterTied(val, true))
            .forEach(({api,val}) => {

                api.light(r.full);

                let sel = seq().getSelectedSteps();
                let one = sel[0];

                if (sel.length && one.tiedto && one.i === val) {

                    let step = seq().steps[getI(val, seq().page)];
                    let last = seq().steps[step.tiedto];

                    SeqGridElems
                        .filter(({val}) => val > step.i && val <= last.i)
                        .forEach(({val}) => tied.add(val));

                }
            });

        SeqGridElems
            .filter(({val}) => tied.has(val))
            .forEach(({api}) => api.light(r.low));

        SeqGridElems
            .filter(({val}) => filterActive(val, true))
            .filter(({val}) => filterTied(val, false))
            .forEach(({api}) => api.light(a.low));

        SeqGridElems
            .filter(({val}) => filterSelected(val, true))
            .forEach(({api}) => api.light(a.full));

        SeqGridElems
            .filter(({val}) => filterPlaying(val, true))
            .forEach(({api}) => api.light(g.full));

        SeqGridElems
            .filter(({val}) => filterSelected(val, false))
            .filter(({val}) => filterPlaying(val, false))
            .filter(({val}) => filterActive(val, false))
            .filter(({val}) => !tied.has(val))
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
        return steps.slice(start, end).map(({selected}) => (selected) ? '1' : '0');
    });

    console.log('--------');
    console.log(grid);

});