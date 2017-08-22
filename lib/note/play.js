import Rx from 'rxjs';
import {inst} from '../inst/inst';
import {NOTE_MODS} from './mods';
import {PadColors} from '../colors';
import {NoteActions} from './actions';

let KeyboardPress = NoteActions.keyboard
    .filter(() => !NOTE_MODS.size)
    .filter(key => key.pressed)
    .map(key => key.val - 1)
    .filter(val => inst().getNote(val))
    .do(val => inst().playNote(val))
    .publish().connect();

let KeyboardRelease = NoteActions.keyboard
    .filter(key => !key.pressed)
    .filter(() => !NOTE_MODS.size)
    .map(key => key.val - 1)
    .filter(val => inst().getNote(val))
    .do(val => inst().stopNote(val))
    .publish().connect();

let KeyboardRecordNote = NoteActions.keyboard
    .filter(key => key.pressed)
    .filter(() => inst().record)
    .filter(() => !NOTE_MODS.size)
    .map(key => key.val - 1)
    .do(val => inst().toggleNote(val))
    .do(val => inst().generatePlayback())
    .publish().connect();
