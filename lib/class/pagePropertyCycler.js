import Rx from 'rxjs';
import {MixArrowRight, MixArrowLeft} from '../mix/actions';

export class PagePropertyCycler {

    constructor (seq, mods, mod) {

        let Next = Rx.Observable
            .combineLatest(seq, MixArrowRight)
            .filter(() => mods.has(mod))
            .do(([seq]) => seq.getPage().cycle[mod].next())
            .publish();

        let Prev = Rx.Observable
            .combineLatest(seq, MixArrowLeft)
            .filter(() => mods.has(mod))
            .do(([seq]) => seq.getPage().cycle[mod].prev())
            .publish();

        Next.connect();
        Prev.connect();

        this.Change = Rx.Observable.merge(Next, Prev);

    }

}