import tonal from 'tonal';
import {Font} from '../tools/font';
import {Sequence} from './sequence';

let SCALE = tonal.scale.names().filter(name => Font.has('scale-' + name));
let KEY = tonal.range.chromatic('C0 B0').map(note => tonal.note.pc(note));
let OCTAVE = Array(7).fill().map((k,v) => v - 1); // C-1 = midi 0;

let ORDER_REVERSE = [];
let ORDER_NATURAL = [];

Array(8).fill().forEach((k, y) => {
    Array(8).fill().forEach((k, x) => {
        let i = (y * 8) + x;
        ORDER_NATURAL[i] = i;
        ORDER_REVERSE[i] = (8 * (7 - y)) + x;
    });
});

export class Instrument {

    constructor (i) {

        this.i = i;
        this.channel = i;
        this.mute = false;
        this.solo = false;

        this.layout = {
            order: ORDER_REVERSE,
            scale: 'chromatic',
            mode: 'keyboard',
            octave: 0,
            key: 'C'
        };

        this.playing = new Set();
        this.sequence = new Sequence(i);
        this.notes = this.generateNotes();

        this.cycle = {};

        [
            ['scale', SCALE],
            ['key', KEY],
            ['octave', OCTAVE]
        ].forEach(([name, values]) => {
            this.cycle[name] = {
                next: () => {
                    this.layout[name] = _next(values, this.layout[name]);
                    this.notes = this.generateNotes();
                },
                prev: () => {
                    this.layout[name] = _prev(values, this.layout[name]);
                    this.notes = this.generateNotes();
                }
            }
        });

    }

    generateNotes() {

        let l = this.layout;
        let o = l.octave;
        let notes = [];
        let start = [l.key, l.octave].join('');
        let scale = [l.key, l.scale].join(' ');

        Array(15).fill().forEach((v, i) => {
            i = i + o;
            tonal.scale.notes(scale)
                .map(note => [note, i].join(''))
                .map(note => [note, tonal.midi.toMidi(note)])
                .filter(([,midi]) => midi < 128)
                .forEach(note => notes.push(note));
        });

        return notes.slice(0, 127);
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
        this.notes = this.generateNotes();
    }

    setOctave(octave) {
        this.layout.octave = octave;
        this.notes = this.generateNotes();
    }

    setKey(key) {
        this.layout.key = key;
        this.notes = this.generateNotes();
    }

    getScale() {
        return this.layout.scale;
    }

    getOctave() {
        return this.layout.octave;
    }

    getKey() {
        return this.layout.key;
    }

    getNote(i) {
        i = this.layout.order[i];
        return this.notes[i];
    }

    playNote(i) {
        let note = this.getNote(i);
        note ? this.playing.add(note) : () => {};
        console.log('playing', i, this.playing);
    }

    stopNote(i) {
        let note = this.getNote(i);
        note ? this.playing.delete(note) : () => {};
    }

}


function _next(what, curr) {
    let i = what.indexOf(curr);
    return what[(i === what.length - 1) ? 0 : i + 1];
}

function _prev(what, curr) {
    let i = what.indexOf(curr);
    return what[(i === 0) ? what.length - 1 : i - 1];
}