import Rx from 'rxjs';
import {SeqDevice} from './device';
import * as Length from './mod/length';
import * as Select from './mod/select';
import * as Delete from './mod/delete';

export let SEQ_MODS = new Set();

export let SeqMods = Rx.Observable.merge(
    Delete.State,
    Select.State,
    Length.State)
    .do(([state, bool]) => {
        bool ? SEQ_MODS.add(state) : SEQ_MODS.delete(state);
        return SEQ_MODS;
    }).publish();

SeqMods.connect();