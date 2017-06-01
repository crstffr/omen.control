import tonal from 'tonal';
import {Sequence} from './sequence';

let SCALES = tonal.scale.names();
let KEYS = tonal.range.chromatic('C0 B0').map(note => tonal.note.pc(note));
let OCTAVES = [1,2,3];

export class Instrument {

    constructor (i) {

        this.i = i;
        this.channel = i;
        this.mute = false;
        this.solo = false;
        this.layout = {
            scale: 'chromatic',
            mode: 'keyboard',
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

    setLayout(layout) {
        this.layout.mode = layout;
    }

    setScale(scale) {
        this.layout.scale = scale;
    }

    setOctave(octave) {
        this.layout.octave = octave;
    }

    setKey(key) {
        this.layout.key = key;
    }

}