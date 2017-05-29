import Rx from 'rxjs';
import {ToggleStep, DeleteStep, DeletePage, DeleteAll} from '../inst/sequence';
import {CURRENT_SEQ, Redraw} from '../inst/sequence';
import {LaunchPadColors} from '../colors';
import {SeqPageElems} from './elems';
import {SeqGridElems} from './elems';

let off = LaunchPadColors.off;
let red = LaunchPadColors.red.low;
let amber = LaunchPadColors.amber.low;
let green = LaunchPadColors.green.low;

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


Redraw.merge(DeletePageComplete, DeleteAllComplete)
    .subscribe(() => {

        SeqPageElems
            .filter(({val}) => val === seq().page)
            .forEach(({api}) => api.light(green));

        SeqPageElems
            .filter(({val}) => val !== seq().page)
            .forEach(({api}) => api.dark());

        SeqGridElems
            .filter(({val}) => filterActive(val, true))
            .forEach(({api}) => api.light(amber));

        SeqGridElems
            .filter(({val}) => filterActive(val, false))
            .forEach(({api}) => api.dark());

});