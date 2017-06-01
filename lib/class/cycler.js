import Rx from 'rxjs';
import {ArrowKeys} from '../mix/actions';

export class Cycler {

    constructor (parent, mods, mod, nextFn, prevFn) {

        let next = Rx.Observable
            .combineLatest(parent, ArrowKeys.right)
            .filter(() => mods.has(mod))
            .do(nextFn)
            .publish();

        let prev = Rx.Observable
            .combineLatest(parent, ArrowKeys.left)
            .filter(() => mods.has(mod))
            .do(prevFn)
            .publish();

        this.change = Rx.Observable.merge(next, prev);

        next.connect();
        prev.connect();

    }

}