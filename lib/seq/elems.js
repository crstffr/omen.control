import {SeqDevice} from './device';
import {MapLaunchPadBtn} from '../elems';
import {LAUNCHPAD_ELEMS} from '../elems';

export let SeqElems = [];
export let SeqPageElems = [];
export let SeqSideElems = [];
export let SeqGridElems = [];

SeqDevice.subscribe((device) => {

    SeqElems = Object.keys(LAUNCHPAD_ELEMS).map((xy) => {
        return MapLaunchPadBtn(device.getButton(xy[0], xy[1]));
    });

    SeqPageElems = SeqElems.filter((key) => key.pos.top);
    SeqSideElems = SeqElems.filter((key) => key.pos.side);
    SeqGridElems = SeqElems.filter((key) => key.pos.grid);

});