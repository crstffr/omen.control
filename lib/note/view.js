import Rx from 'rxjs';
import tonal from 'tonal';
import {inst} from '../inst/inst';
import {Font} from '../tools/font';
import {Midi} from '../device/midi';
import {PadColors} from '../colors';
import {NoteDevice} from './device';
import {NoteElemsObj} from './elems';
import {NOTE_MODS, NoteMods} from './mods';
import {InstPlayback} from '../inst/playback';
import {NoteActions, RecordAction, PlaybackAction, PanicAction} from './actions';
import {Redraw as SeqRedraw} from '../inst/sequence';
import {InstrumentState, ModeChange, Cyclers} from '../inst/inst';
import {LaunchPadRenderer} from '../class/launchPadRenderer';

import './mods';
import './play';

let PREV_MODE = '';

let m = NoteMods;
let d = NoteDevice;
let r = PadColors.red;
let g = PadColors.green;
let a = PadColors.amber;

let layouts = [
    'keyboard',
    'chord',
    'arp',
    'drum',
    'ccs'
];

let ShowScale = new LaunchPadRenderer(d, m, 'scale', Cyclers.scale.change, a.low, () => {
    let char = ['scale-', inst().getScale()].join('');
    return Font.get(char);
});

let ShowKey = new LaunchPadRenderer(d, m, 'key', Cyclers.key.change, a.low, () => {
    let char = ['key-', inst().getKey()].join('');
    return Font.get(char);
});

let ShowOctave = new LaunchPadRenderer(d, m, 'octave', Cyclers.octave.change, a.low, () => {
    return Font.get(inst().getOctave());
});

PanicAction.subscribe(() => Midi.panic());

RecordAction.subscribe(() => inst().toggleRecord());

PlaybackAction.subscribe(() => InstPlayback.toggle());

InstPlayback.renderObservable.subscribe(() => {
    NoteElemsObj.play.api.light(a.low);
});

InstPlayback.playObservable.subscribe(() => {
    NoteElemsObj.play.api.light(g.low);
});

InstPlayback.stopObservable.subscribe(() => {
    NoteElemsObj.play.api.dark();
});

let NoteRedraw = Rx.Observable
    .merge(
        InstrumentState.delay(1),
        InstPlayback.positionObservable,
        InstPlayback.stopObservable,
        NoteActions.keyboard,
        ShowScale.Complete,
        ShowKey.Complete,
        RecordAction,
        ModeChange,
        SeqRedraw)
    .subscribe(() => {

        let ins = inst();
        let mode = ins.layout.mode;
        let li = layouts.indexOf(mode);
        let reset = mode !== PREV_MODE;
        PREV_MODE = mode;

        let ModeBtns = NoteElemsObj.top
            .filter(btn => btn.val < 6)
            .map(btn => [btn, btn.val - 1]);

        ModeBtns
            .filter(([,i]) => i === li)
            .forEach(([btn]) => btn.api.light(a.full));

        ModeBtns
            .filter(([,i]) => i !== li)
            .forEach(([btn]) => btn.api.dark());

        let NoteBtns = NoteElemsObj.grid
            .filter(() => !NOTE_MODS.size)
            .map(btn => [btn, inst().getNote(btn.val - 1)]);

        let ValidNotes = NoteBtns
            .filter(([,note]) => note);

        let InvalidNotes = NoteBtns
            .filter(([,note]) => !note);

        let RecordedNotes = NoteBtns
            .filter((obj) => {
                if (!obj[1]) { return; }
                let note = obj[1][0];
                let foo = inst().sequence.selectedStepsNotes().has(note);
                return foo;
            });

        let RootBtns = ValidNotes
            .filter(([btn, [note]]) => {
                return tonal.note.pc(note) === inst().getKey();
            });

        let NotRootBtns = ValidNotes
            .filter(([btn, [note]]) => {
                return tonal.note.pc(note) !== inst().getKey();
            });

        let Playing = ValidNotes
            .filter(([,[,midi]]) => inst().playing.has(midi));

        let NotPlaying = ValidNotes
            .filter(([,[,midi]]) => !inst().playing.has(midi));

        let RecordBtn = NoteElemsObj.side
            .filter(btn => btn.val === 7)
            .forEach(btn => inst().record ? btn.api.light(r.low) : btn.api.dark());

        if (reset) {
            NoteBtns.forEach(([btn]) => btn.api.dark());
        }

        switch(mode) {
            case 'keyboard':
                InvalidNotes.forEach(([btn]) => btn.api.light(r.low));
                NotPlaying.forEach(([btn]) => btn.api.dark());
                //NotRootBtns.forEach(([btn]) => btn.api.dark());
                //RootBtns.forEach(([btn]) => btn.api.light(a.full));
                RecordedNotes.forEach(([btn]) => btn.api.light(a.low));
                Playing.forEach(([btn]) => btn.api.light(a.full));
                break;

            default:
                NotPlaying.forEach(([btn]) => btn.api.dark());
                Playing.forEach(([btn]) => btn.api.light(a.full));
        }

});
