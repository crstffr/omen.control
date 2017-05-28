import {Sequence} from 'sequence';

export class Instrument {

    constructor (channel) {

        this.channel = channel;
        this.sequence = new Sequence();

    }

}