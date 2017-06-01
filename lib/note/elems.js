import {NoteDevice} from './device';
import {MapLaunchPadBtn} from '../elems';
import {LAUNCHPAD_ELEMS} from '../elems';

export let NoteElems = [];
export let NoteTopElems = [];
export let NoteSideElems = [];
export let NoteGridElems = [];
export let NoteElemsObj = {
    all: [],
    top: [],
    side: [],
    grid: []
};

NoteDevice.subscribe((device) => {

    NoteElemsObj.all = NoteElems = Object.keys(LAUNCHPAD_ELEMS).map((xy) => {
        return MapLaunchPadBtn(device.getButton(xy[0], xy[1]));
    });

    NoteElemsObj.side = NoteSideElems = NoteElems.filter((key) => key.pos.side);
    NoteElemsObj.grid = NoteGridElems = NoteElems.filter((key) => key.pos.grid);
    NoteElemsObj.top = NoteTopElems = NoteElems.filter((key) => key.pos.top);
});