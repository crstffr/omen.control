import {Sequence, Page, Redraw, SequenceToggleStep} from '../inst/sequence';
import {LaunchPadColors} from '../colors';
import {SeqPageElems} from './elems';
import {SeqGridElems} from './elems';

import './mods';

let off = LaunchPadColors.off;
let amber = LaunchPadColors.amber.low;
let green = LaunchPadColors.green.low;

Redraw.subscribe((seq) => {
    
    SeqPageElems
        .filter(({val}) => val === seq.page)
        .forEach(({api}) => api.light(green));

    SeqPageElems
        .filter(({val}) => val !== seq.page)
        .forEach(({api}) => api.dark());

    SeqGridElems
        .filter(({val}) => seq.steps[getI(val, seq.page)].on)
        .forEach(({api}) => api.light(amber));

    SeqGridElems
        .filter(({val}) => !seq.steps[getI(val, seq.page)].on)
        .forEach(({api}) => api.dark());

});

SequenceToggleStep.subscribe(({key, active}) => {
    key.api.light((active) ? amber : off);
});

function getI(val, page) {
    return (64 * (page - 1)) + val;
}