import Rx from 'rxjs';
import {MixDevice} from './device';
import {CtrlColors} from '../colors';
import {MixElemsObj} from './elems';
import {LaunchCtrlModifer} from '../class/launchCtrlModifier';

export let MIX_MODS = new Set();

let d = MixDevice;
let e = MixElemsObj.mod;
let c = CtrlColors.modifier.full;

let MODS = [
    ['channel', c],
    ['mute', c],
    ['solo', c],
    ['arm', c]
].map(([name, color], i) => {
    let mod = new LaunchCtrlModifer(d, e, ++i, name, color);
    mod.Activate = mod.Activate.filter(() => !MIX_MODS.size);
    return mod.init();
});

export let MixMods = Rx.Observable.merge.apply(Rx.Observable, MODS)
    .do(([state, bool]) => bool ? MIX_MODS.add(state) : MIX_MODS.delete(state))
    .map(() => MIX_MODS).publish();

MixMods.connect();