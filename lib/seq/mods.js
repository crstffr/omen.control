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
let s = 'side';

let SeqModStreams = [
    ['length',   g,  s, 1],
    ['repeat',   a,  s, 2],
    ['speed',    a,  s, 3],
    ['playback', a,  s, 4],
    ['delete',   r,  s, 5],
    ['copy',     a,  s, 6],
    ['position', a,  s, 7],
    ['select',   g,  s, 8]
].map(([name, color, group, i]) => {
    let mod = new LaunchPadModifer(d, e, group, i, name, color);
    mod.Activate = mod.Activate.filter(() => !SEQ_MODS.size);
    return mod.init();
});

export let SeqModsChange = Rx.Observable.merge.apply(Rx.Observable, SeqModStreams)
    .do(([state, bool]) => bool ? SEQ_MODS.add(state) : SEQ_MODS.delete(state))
    .publish();

export let SeqMods = SeqModsChange
    .map(() => SEQ_MODS)
    .publish();


SeqMods.connect();
SeqModsChange.connect();