import Rx from 'rxjs';
import {Boot} from '../boot';
import {Instruments} from './collection';
import {SelectInst} from '../mix/actions';

let InitialInst = Rx.Observable.merge(Boot)
    .map(() => state => Object.assign({}, state, {inst: Instruments[1]}));

let SelectedInst = Rx.Observable.merge(SelectInst)
    .map(elem => state => Object.assign({}, state, {inst: Instruments[elem.inst]}));

export let InstState = Rx.Observable
    .merge(InitialInst, SelectedInst)
    .scan((state, changeFn) => changeFn(state), {});