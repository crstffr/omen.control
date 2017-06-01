import Rx from 'rxjs';
import {SeqDevice} from './device';
import {PadColors} from '../colors';
import {SeqElemsObj} from './elems';
import {LaunchPadModifer} from '../class/launchpadModifier';

export let SEQ_MODS = new Set();

let d = SeqDevice;
let e = SeqElemsObj;
let r = PadColors.red.low;
let g = PadColors.green.low;
let a = PadColors.amber.low;
let o = PadColors.amber.full;

let SeqModStreams = [
    ['length',   g,  1],
    ['repeat',   a,  2],
    ['speed',    a,  3],
    ['playback', a,  4],
    ['delete',   r,  5],
    ['copy',     o,  6],
    ['position', o,  7],
    ['select',   o,  8]
].map(([name, color, i]) => {
    let mod = new LaunchPadModifer(d, e, 'side', i, name, color);
    mod.Activate = mod.Activate.filter(() => !SEQ_MODS.size);
    return mod.init();
});

export let SeqModsChange = Rx.Observable
    .merge.apply(Rx.Observable, SeqModStreams)
    .do(([state, bool]) => !bool
        ? SEQ_MODS.delete(state)
        : SEQ_MODS.add(state))
    .publish();

export let SeqMods = SeqModsChange
    .map(() => SEQ_MODS)
    .publish();

SeqMods.connect();
SeqModsChange.connect();
