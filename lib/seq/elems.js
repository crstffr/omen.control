import {SeqDevice} from './device';
import {LAUNCHPAD_ELEMS} from '../elems';

export let SeqElems = [];
export let SeqPageElems = [];
export let SeqSideElems = [];
export let SeqGridElems = [];

SeqDevice.subscribe((device) => {

    SeqElems = Object.keys(LAUNCHPAD_ELEMS).map((xy) => {
        let key = Object.assign({}, LAUNCHPAD_ELEMS[xy]);
        key.api = device.getButton(key.x, key.y);
        key.device = device;
        return key;
    });

    SeqPageElems = SeqElems.filter((key) => key.pos.top);
    SeqSideElems = SeqElems.filter((key) => key.pos.side);
    SeqGridElems = SeqElems.filter((key) => key.pos.grid);

});