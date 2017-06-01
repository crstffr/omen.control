import Rx from 'rxjs';
import {SEQ_MODS} from '../seq/mods';
import {NOTE_MODS} from '../note/mods';
import {NoteTopPress} from '../note/actions';

/**
 * ----------------------
 * KEYBOARD MODE SELECTION
 * ----------------------
 */

let KeyboardModePress = NoteTopPress
    .filter(() => !SEQ_MODS.size)
    .filter(() => !NOTE_MODS.size)
    .map(({val}) => val);

export let KeyboardMode = KeyboardModePress
    .filter(() => !SEQ_MODS.size)
    .do(val => { seq().page = val})
    .startWith({val: 1});