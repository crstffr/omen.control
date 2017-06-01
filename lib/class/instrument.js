import {Sequence} from './sequence';

export class Instrument {

    constructor (i) {

        this.i = i;
        this.channel = i;
        this.mute = false;
        this.solo = false;
        this.layout = {
            mode: 'keyboard',
            scale: 'chromatic',
            octave: 1,
            key: 'c'
        };

        this.sequence = new Sequence(i);

    }

    nextChannel(c = this.channel) {
        this.channel = ++c <= 16 ? c : 1;
    }

    prevChannel(c = this.channel) {
        this.channel = --c >= 1 ? c : 16;
    }

    serialize() {

        return JSON.stringify(this);

        return {
            sequence: this.sequence.serialize(),
            channel: this.channel,
            solo: this.solo,
            mute: this.mute,
        };
    }

}