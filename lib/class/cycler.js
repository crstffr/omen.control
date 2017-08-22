import Rx from 'rxjs';
import {ArrowKeys} from '../mix/actions';
import {SeqGridArrows} from '../seq/actions';

export class Cycler {

    constructor (parent, mods, mod, nextFn, prevFn) {

        let gridUp = Rx.Observable.combineLatest(parent, SeqGridArrows.up);
        let gridDown = Rx.Observable.combineLatest(parent, SeqGridArrows.down);
        let arrowLeft = Rx.Observable.combineLatest(parent, ArrowKeys.left);
        let arrowRight = Rx.Observable.combineLatest(parent, ArrowKeys.right);

        let next = Rx.Observable
            .merge(gridUp, arrowRight)
            .filter(() => mods.has(mod))
            .do(nextFn)
            .publish();

        let prev = Rx.Observable
            .merge(gridDown, arrowLeft)
            .filter(() => mods.has(mod))
            .do(prevFn)
            .publish();

        this.change = Rx.Observable.merge(next, prev);

        next.connect();
        prev.connect();

    }

}