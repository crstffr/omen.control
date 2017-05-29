import Rx from 'rxjs';

/*
let SeqInitialPage = Rx.Observable.merge(SeqDevice)
    .map(() => state => Object.assign({}, state, {page: 1}));

let SeqSelectPage = Rx.Observable.merge(SeqPagePress)
    .map((key) => state => Object.assign({}, state, {page: key.val}));

let SeqInstPage = Rx.Observable.merge(SequenceState)
    .map((seq) => state => Object.assign({}, state, {page: seq.page}));


export let SeqPageState = Rx.Observable.merge(SeqInitialPage, SeqSelectPage)
    .scan((state, changeFn) => changeFn(state), {});

 */