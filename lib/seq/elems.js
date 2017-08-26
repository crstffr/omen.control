import {SeqDevice} from './device';
import {MapLaunchPadBtn} from '../elems';
import {LAUNCHPAD_ELEMS} from '../elems';

export let SeqElems = [];
export let SeqPageElems = [];
export let SeqSideElems = [];
export let SeqGridElems = [];
export let SeqElemsObj = {
    all: [],
    page: [],
    side: [],
    grid: []
};

SeqDevice.subscribe((device) => {

    SeqElemsObj.all = SeqElems = Object.keys(LAUNCHPAD_ELEMS).map((xy) => {
        return MapLaunchPadBtn(device.getButton(xy[0], xy[1]));
    });

    SeqElemsObj.page = SeqPageElems = SeqElems.filter((elem) => elem.pos.top);
    SeqElemsObj.side = SeqSideElems = SeqElems.filter((elem) => elem.pos.side);
    SeqElemsObj.grid = SeqGridElems = SeqElems.filter((elem) => elem.pos.grid);

});