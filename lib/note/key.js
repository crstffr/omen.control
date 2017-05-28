
import {AssignedDeviceKeyStream} from '../device/key';

export let NoteKeyPressStream = AssignedDeviceKeyStream
    .filter((key) => {
        return key.device.name === 'note';
    });

export let NoteGridPressStream = NoteKeyPressStream
    .filter((key) => {
        return key.pos.grid;
    });

export let NotePagePressStream = NoteKeyPressStream
    .filter((key) => {
        return key.pos.top;
    });

export let NoteModifierPressStream = NoteKeyPressStream
    .filter((key) => {
        return key.pos.side;
    });