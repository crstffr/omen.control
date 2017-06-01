import {Cycler} from '../class/cycler';
import {SEQ_MODS} from '../seq/mods';
import {NOTE_MODS} from '../note/mods';

export class PageCycler extends Cycler {
    constructor (seq, mod) {
        super(seq, SEQ_MODS, mod,
            ([seq]) => seq.getPage().cycle[mod].next(),
            ([seq]) => seq.getPage().cycle[mod].prev());
    }
}

export class InstCycler extends Cycler {
    constructor (inst, mod) {
        super(inst, NOTE_MODS, mod,
            () => console.log(mod, 'next'),
            () => console.log(mod, 'prev'),
        )
    }
}