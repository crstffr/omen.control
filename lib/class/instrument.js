import tonal from 'tonal';
import {Font} from '../tools/font';
import {Sequence} from './sequence';
import {SPEED} from './page';

let SCALE = tonal.scale.names().filter(name => Font.has('scale-' + name));
let KEY = tonal.range.chromatic('C0 B0').map(note => tonal.note.pc(note));
let OCTAVE = Array(7).fill().map((k,v) => v - 1); // C-1 = midi 0;

let SPEED_DISTRIBUTION = [64, 32, 16, 8, 4, 2, 1];
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
        this.record = false;

        this.layout = {
            order: ORDER_REVERSE,
            scale: 'chromatic',
            mode: 'keyboard',
            octave: 0,
            key: 'C'
        };

        this.cycle = {};
        this.playbackNotes = [];
        this.playbackSteps = [];
        this.playing = new Set();
        this.sequence = new Sequence(i);
        this.notes = this.generateNotes();

        [
            ['key', KEY],
            ['scale', SCALE],
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

    generatePlayback() {

        return new Promise((resolve, reject) => {

            let pageLengths = [];
            let pageOffsets = [];

            this.playbackNotes.length = 0;
            this.playbackSteps.length = 0;

            this.sequence.pages.forEach(page => {

                let every = SPEED_DISTRIBUTION[SPEED.indexOf(page.speed)];
                let length = (page.end - page.start + 1);
                let repeat = page.repeat;

                pageLengths[page.i] = length * every * repeat;
                pageLengths.forEach((len, i) => {
                    pageOffsets[i] = (pageOffsets[i-1] + pageLengths[i-1]) || 0;
                });

                /*
                console.log('page', page.i)
                console.log('  every', every);
                console.log('  length', length);
                console.log('  repeat', repeat);
                console.log('  length', pageLengths[page.i]);
                console.log('  offset', pageOffsets[page.i]);
                */

                for (let r = 1; r <= repeat; r++) {

                    let offset = (r - 1) * length * every;

                    for (let i = page.start; i <= page.end; i++) {

                        let ii = (i - page.start) + 1;
                        let pos = (pageOffsets[page.i] + (ii * every) + offset) - every + 1;
                        let stepi = ((page.i - 1) * 64) + i;
                        let step = this.sequence.getStep(stepi);

                        for (let si = pos; si <= pos + every; si++) {
                            this.playbackSteps[si] = stepi;
                        }

                        // console.log('  step/pos', stepi, pos);

                        if (step.notes.size > 0) {
                            this.playbackNotes[pos] = [];
                            step.notes.forEach(note => {
                                this.playbackNotes[pos].push({
                                    inst: this.i,
                                    midi: tonal.note.midi(note),
                                    hold: every,
                                });
                            });
                        }
                    }
                }

                // console.log('-----');

            });

            resolve([this.playbackNotes, this.playbackSteps]);

        });

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

    getMidi(i) {
        return this.getNote(i)[1];
    }

    playNote(i) {
        let midi = this.getMidi(i);
        midi ? this.playMidi(midi) : () => {};
    }

    playMidi(midi) {
        this.playing.add(midi);
        console.log('play midi', midi);
    }

    toggleNote(i) {
        let note = this.getNote(i)[0];
        let steps = this.sequence.getSelectedSteps();
        if (steps.length === 0) { return; }
        let has = steps[0].notes.has(note);
        steps.forEach(step => {
            step.notes[has ? 'delete' : 'add'](note);
        });
    }

    stopNote(i) {
        let midi = this.getMidi(i);
        midi ? this.stopMidi(midi) : () => {};
    }

    stopMidi(midi) {
        this.playing.delete(midi);
        console.log('stop midi', midi);
    }

    startRecord() {
        this.record = true;
    }

    stopRecord() {
        this.record = false;
    }

    toggleRecord() {
        this.record = !this.record;
        return this.record;
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