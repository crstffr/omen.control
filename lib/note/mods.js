import Rx from 'rxjs';
import {NoteDevice} from './device';
import {PadColors} from '../colors';
import {NoteElemsObj} from './elems';
import {LaunchPadModifer} from '../class/launchpadModifier';

export let NOTE_MODS = new Set();

let d = NoteDevice;
let e = NoteElemsObj;
let r = PadColors.red.low;
let g = PadColors.green.low;
let a = PadColors.amber.low;
let s = 'side';
let t = 'top';


let NoteModStreams = [
    ['scale',    a, t,   6],
    ['key',      a, t,   7],
    ['octave',   a, t,   8],
    ['length',   a, s,   1],
    ['velocity', a, s,   2],
    ['tie',      a, s,   3],
    ['shift',    a, s,   4]
].map(([name, color, group, i]) => {
    let mod = new LaunchPadModifer(d, e, group, i, name, color);
    mod.Activate = mod.Activate.filter(() => !NOTE_MODS.size);
    return mod.init();
});

export let NoteModsChange = Rx.Observable
    .merge.apply(Rx.Observable, NoteModStreams)
    .do(([state, bool]) => !bool
        ? NOTE_MODS.delete(state)
        : NOTE_MODS.add(state))
    .publish();

export let NoteMods = NoteModsChange
    .map(() => NOTE_MODS)
    .publish();

NoteMods.connect();
NoteModsChange.connect();