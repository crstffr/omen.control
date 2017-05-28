import Rx from 'rxjs';
import {LaunchPadColors} from '../colors';
import {SeqReady} from './ready';
import {SeqPagePress, SeqPageKeys} from './key';

let SeqInitialPage = Rx.Observable.merge(SeqReady)
    .map(() => state => Object.assign({}, state, {page: 1}));

let SeqSelectPage = Rx.Observable.merge(SeqPagePress)
    .map((key) => state => Object.assign({}, state, {page: key.val}));

export let SeqPageState = Rx.Observable.merge(SeqInitialPage, SeqSelectPage)
    .scan((state, changeFn) => changeFn(state), {});

SeqPageState.subscribe((state) => {

    SeqPageKeys
        .filter((key) => key.val === state.page)
        .forEach(key => key.api.light(LaunchPadColors.green.low));

    SeqPageKeys
        .filter((key) => key.val !== state.page)
        .forEach(key => key.api.light(LaunchPadColors.off));

});