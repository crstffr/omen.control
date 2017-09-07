import Rx from 'rxjs';
import {ArrowKeys} from '../mix/actions';
import {SeqGridArrows} from '../seq/actions';
import {NoteGridArrows} from '../note/actions';

export class Cycler {

    constructor (parent, mods, mod, nextFn, prevFn) {

        let seqGridUp = Rx.Observable.combineLatest(parent, SeqGridArrows.up);
        let noteGridUp = Rx.Observable.combineLatest(parent, NoteGridArrows.up);
        let seqGridDown = Rx.Observable.combineLatest(parent, SeqGridArrows.down);
        let noteGridDown = Rx.Observable.combineLatest(parent, NoteGridArrows.down);
        let arrowLeft = Rx.Observable.combineLatest(parent, ArrowKeys.left);
        let arrowRight = Rx.Observable.combineLatest(parent, ArrowKeys.right);

        let next = Rx.Observable
            .merge(seqGridUp, noteGridUp, arrowRight)
            .filter(() => mods.has(mod))
            .do(nextFn)
            .publish();

        let prev = Rx.Observable
            .merge(seqGridDown, noteGridDown, arrowLeft)
            .filter(() => mods.has(mod))
            .do(prevFn)
            .publish();

        this.change = Rx.Observable.merge(next, prev);

        next.connect();
        prev.connect();

    }

}