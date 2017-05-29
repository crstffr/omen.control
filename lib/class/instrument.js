import {Sequence} from './sequence';

export class Instrument {

    constructor (i) {

        this.i = i;
        this.channel = i;
        this.sequence = new Sequence(i);

    }

    nextChannel(c = this.channel) {
        this.channel = ++c <= 16 ? c : 1;
    }

    prevChannel(c = this.channel) {
        this.channel = --c >= 1 ? c : 16;
    }

}