import Rx from 'rxjs';
import {MixDevice} from './device';
import {MixBotBtnElems} from './elems';
import {MixPressAction} from './actions';

let MixInitialInst = Rx.Observable.merge(MixDevice)
    .map(() => state => Object.assign({}, state, {inst: 1}));

let MixSelectInst = Rx.Observable
    .merge(MixPressAction)
    .filter(elem => elem.row == 6)
    .map(elem => state => Object.assign({}, state, {inst: elem.inst}));

export let MixInstState = Rx.Observable
    .merge(MixInitialInst, MixSelectInst)
    .scan((state, changeFn) => changeFn(state), {});

let MixMuteInst = Rx.Observable
    .merge(MixPressAction)
    .filter(elem => elem.row == 5);