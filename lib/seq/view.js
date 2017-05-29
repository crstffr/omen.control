import Rx from 'rxjs';
import {Font} from '../tools/font';
import {LaunchPadColors} from '../colors';

import {SeqDevice} from './device';

import {ToggleStep, DeleteStep} from '../inst/sequence';
import {DeletePage, DeleteAll} from '../inst/sequence';
import {CURRENT_SEQ, Redraw} from '../inst/sequence';
import {InstChannelChange} from '../inst/state';
import {Instruments} from '../inst/collection';

import {SeqElems, SeqPageElems, SeqGridElems} from './elems';

import {MixMods} from '../mix/mods';
import {MixArrowRight, MixArrowLeft} from '../mix/actions';

let off = LaunchPadColors.off;
let red = LaunchPadColors.red.low;
let amber = LaunchPadColors.amber.low;
let green = LaunchPadColors.green.full;

let seq = () => CURRENT_SEQ;
let getI = (val, page) => (64 * (page - 1)) + val;

function filterActive(val, bool) {
    let act = seq().steps[getI(val, seq().page)].active;
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


let ShowInstChannel = SeqDevice
    .flatMap(device => MixMods.map(mod => [mod, device]))
    .filter(([[mod, bool]]) => mod === 'channel' && bool)
    .map(([mod, device]) => device);

let ShowChangedInstChannel = SeqDevice
    .flatMap(device => InstChannelChange.map(() => device));

let RenderInstChannel = Rx.Observable
    .merge(ShowInstChannel, ShowChangedInstChannel)
    .subscribe((device) => {
        device.allDark();
        let bytes = Font.get(Instruments[seq().i].channel);
        device.renderBytes(bytes, amber);
    });

let ShowInstChannelComplete = MixMods
    .filter(([mod, bool]) => mod === 'channel' && !bool);

Redraw.merge(
    DeletePageComplete,
    DeleteAllComplete,
    ShowInstChannelComplete)
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
            .filter(({val}) => filterActive(val, false))
            .forEach(({api}) => api.dark());

});





/*
 // This is for capturing grid based shapes (Fonts)
 import {State as LengthState} from './mod/length';
LengthState.subscribe(([name, bool]) => {
    if (!bool) { return; }

    let steps = seq().steps.filter(({page}) => page === seq().page);

    let grid = Array(8).fill().map((v, i) => {
        let start = 8 * i;
        let end = start + 8;
        return steps.slice(start, end).map(({active}) => (active) ? '1' : '0');
    });

    console.log('--------');
    console.log(grid);

});
    */