import Rx from 'rxjs';
import {CtrlColors} from '../colors';
import {DeleteAll} from '../inst/sequence';
import {InstrumentState} from '../inst/inst';
import {MixBotBtnElems} from './elems';

import './mods';

let CURRENT_INST = {};
let inst = () => CURRENT_INST;

InstrumentState.subscribe(({inst}) => CURRENT_INST = inst);

let DeleteAllComplete = DeleteAll
    .do(inst => {
        MixBotBtnElems
            .filter(elem => elem.inst === inst)
            .forEach(({api}) => api.light(CtrlColors.red.low));
    }).flatMap(() => Rx.Observable.timer(200));

let Redraw = Rx.Observable
    .merge(InstrumentState, DeleteAllComplete)
    .subscribe(() => {

        MixBotBtnElems
            .filter(elem => elem.inst === inst().i)
            .forEach(elem => elem.api.light(CtrlColors.amber.low));

        MixBotBtnElems
            .filter(elem => elem.inst !== inst().i)
            .forEach(elem => elem.api.dark());

    });
