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

let SeqModStreams = [
    ['length', g],
    ['repeat', a],
    ['speed', a],
    ['playback', a],
    ['delete', r],
    ['copy', a],
    ['position', a],
    ['select', g]
].map(([name, color], i) => {
    let mod = new LaunchPadModifer(d, e, ++i, name, color);
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