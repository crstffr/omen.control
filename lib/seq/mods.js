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

let MODS = [
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

export let SeqMods = Rx.Observable.merge.apply(Rx.Observable, MODS)
    .do(([state, bool]) => bool ? SEQ_MODS.add(state) : SEQ_MODS.delete(state))
    .map(() => SEQ_MODS)
    .publish();

SeqMods.connect();