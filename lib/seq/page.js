import Rx from 'rxjs';
import {SeqDevice} from './device';
import {SeqPagePress} from './actions';

let SeqInitialPage = Rx.Observable.merge(SeqDevice)
    .map(() => state => Object.assign({}, state, {page: 1}));

let SeqSelectPage = Rx.Observable.merge(SeqPagePress)
    .map((key) => state => Object.assign({}, state, {page: key.val}));

export let SeqPageState = Rx.Observable.merge(SeqInitialPage, SeqSelectPage)
    .scan((state, changeFn) => changeFn(state), {});