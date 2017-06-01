import Rx from 'rxjs';
import {NoteDevice} from './device';
import {NoteTopElems} from './elems';

export let KeyboardMode = NoteDevice
    .flatMap(() => NoteTopElems)
    .filter((elem) => elem.val === 1)
    .publish();

KeyboardMode.connect();

