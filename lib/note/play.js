import Rx from 'rxjs';
import {inst} from '../inst/inst';
import {NOTE_MODS} from './mods';
import {PadColors} from '../colors';
import {PlayActions} from './actions';

let g = PadColors.green.low;

let KBP = PlayActions.keyboard
    .filter(() => !NOTE_MODS.size)
    .filter(key => key.pressed)
    .do((key) => inst().playNote(key.val - 1))
    .publish();

let KBR = PlayActions.keyboard
    .filter(key => !key.pressed)
    .filter(() => !NOTE_MODS.size)
    .do((key) => inst().stopNote(key.val - 1))
    .publish();

KBP.connect();
KBR.connect();