import Rx from 'rxjs';
import {inst} from '../inst/inst';
import {NOTE_MODS} from './mods';
import {PadColors} from '../colors';
import {PlayActions} from './actions';

let g = PadColors.green.low;

let KBP = PlayActions.keyboard
    .filter(() => !NOTE_MODS.size)
    .filter(key => key.pressed)
    .map(key => key.val - 1)
    .filter(val => inst().getNote(val))
    .do((val) => inst().playNote(val))
    .publish();

let KBR = PlayActions.keyboard
    .filter(key => !key.pressed)
    .filter(() => !NOTE_MODS.size)
    .map(key => key.val - 1)
    .filter(val => inst().getNote(val))
    .do((val) => inst().stopNote(val))
    .publish();

KBP.connect();
KBR.connect();