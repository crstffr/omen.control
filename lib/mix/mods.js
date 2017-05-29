import Rx from 'rxjs';
import {MixDevice} from './device';
import * as Mute from './mod/mute';
import * as Channel from './mod/channel';

export let MIX_MODS = new Set();

export let MixMods = Rx.Observable.merge(
    Mute.State,
    Channel.State)
    .do(([state, bool]) => {
        bool ? MIX_MODS.add(state) : MIX_MODS.delete(state);
        return MIX_MODS;
    }).publish();

MixMods.connect();