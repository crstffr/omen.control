import Rx from 'rxjs';
import {SeqReady} from './ready';
import * as Length from './mod/length'
import * as Select from './mod/select';
import * as Delete from './mod/delete';

export let ModState = Rx.Observable.merge(
    Delete.State,
    Select.State,
    Length.State)
    .map((change) => state => Object.assign({}, state, change))
    .scan((state, changeFn) => changeFn(state), {});

export let ModOn = Rx.Observable.merge(ModState)
    .flatMap((state) => Rx.Observable.pairs(state))
    .filter(pair => pair[1])
    .map(pair => pair[0]);

export let ModOff = Rx.Observable.merge(ModState)
    .map(state => Object.keys(state).map(k => state[k]).filter(s => s).length)
    .filter(v => v === 0);

