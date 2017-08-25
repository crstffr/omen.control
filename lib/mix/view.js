import Rx from 'rxjs';
import {CtrlColors} from '../colors';
import {DeleteAll} from '../inst/sequence';
import {InstrumentState} from '../inst/inst';
import {InstPlayback} from '../inst/playback';
import {Instruments} from '../inst/collection';
import {MixBotBtnElems, MixTopBtnElems} from './elems';
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


let Playing = new Set();
let PlayStepEmitter;
let PlayStepObservable = Rx.Observable
    .create(e => PlayStepEmitter = e).publish();
PlayStepObservable.connect();

InstPlayback.positionObservable
    .subscribe((pos) => {
        Object.keys(Instruments).forEach((k) => {
            let inst = Instruments[k];
            if (inst.playing.size) {
                Playing.add(inst.i);
            } else {
                Playing.delete(inst.i);
            }
            PlayStepEmitter.next();
        });
    });

InstPlayback.stopObservable
    .subscribe(() => {
        Playing.clear();
        PlayStepEmitter.next();
    });

let Redraw = Rx.Observable
    .merge(
        InstrumentState,
        DeleteAllComplete,
        PlayStepObservable)
    .subscribe(() => {

        MixTopBtnElems
            .filter(elem => !Playing.has(elem.inst))
            .forEach(elem => elem.api.dark());

        MixTopBtnElems
            .filter(elem => Playing.has(elem.inst))
            .forEach(elem => elem.api.light(CtrlColors.green.full));

        MixBotBtnElems
            .filter(elem => elem.inst === inst().i)
            .forEach(elem => elem.api.light(CtrlColors.amber.full));

        MixBotBtnElems
            .filter(elem => elem.inst !== inst().i)
            .forEach(elem => elem.api.dark());

    });
