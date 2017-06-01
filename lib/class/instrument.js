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
            octave: 0,
            key: 'C'
        };

        this.playing = new Set();
        this.sequence = new Sequence(i);
        this.notes = this.generateNotes();

    }

    generateNotes() {
        let l = this.layout;
        let o = l.octave;
        let notes = [];
        let start = [l.key, l.octave].join('');
        let scale = [l.key, l.scale].join(' ');

        Array(10).fill().forEach((v, i) => {
            i = i + o;
            tonal.scale.notes(scale)
                .map(note => [note, i].join(''))
                .map(note => [note, tonal.midi.toMidi(note)])
                .forEach(note => notes.push(note));
        });

        return notes;
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

    getKey() {
        return this.layout.key;
    }

    getNote(i) {
        return this.notes[i];
    }

    playNote(i) {
        this.playing.add(this.notes[i][0]);
    }

    stopNote(i) {
        this.playing.delete(this.notes[i][0]);
    }

}