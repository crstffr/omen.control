import Rx from 'rxjs';
import {LaunchPadPressAction} from '../devices/launchpad';

export let NotePressAction = LaunchPadPressAction.filter(key => key.device.name === 'note');
export let NoteSidePress = NotePressAction.filter(key => key.pos.side);
export let NoteGridPress = NotePressAction.filter(key => key.pos.grid);
export let NoteTopPress = NotePressAction.filter(key => key.pos.top);

export let SelectKeyboardLayout = NoteTopPress
    .filter(key => key.val === 1);

export let SelectChordLayout = NoteTopPress
    .filter(key => key.val === 2);

export let SelectArpLayout = NoteTopPress
    .filter(key => key.val === 3);

export let SelectDrumLayout = NoteTopPress
    .filter(key => key.val === 3);
