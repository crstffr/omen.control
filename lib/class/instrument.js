import {Sequence} from './sequence';

export class Instrument {

    constructor (i) {

        this.i = i;
        this.channel = i;
        this.sequence = new Sequence(i);

    }

}