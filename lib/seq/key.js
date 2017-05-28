import Rx from 'rxjs';
import {SeqReady} from './ready';
import {LAUNCHPAD_ELEMS, AssignedLaunchpadKeyPress} from '../device/key';

export let SeqKeys = [];
export let SeqPageKeys = [];
export let SeqSideKeys = [];
export let SeqGridKeys = [];

SeqReady.subscribe((device) => {

    SeqKeys = Object.keys(LAUNCHPAD_ELEMS).map((xy) => {
        let key = Object.assign({}, LAUNCHPAD_ELEMS[xy]);
        key.api = device.getButton(key.x, key.y);
        key.device = device;
        return key;
    });

    SeqPageKeys = SeqKeys.filter((key) => key.pos.top);
    SeqSideKeys = SeqKeys.filter((key) => key.pos.side);
    SeqGridKeys = SeqKeys.filter((key) => key.pos.grid);

});

export let SeqKeyPress = AssignedLaunchpadKeyPress.filter(key => key.device.name === 'seq');
export let SeqPagePress = SeqKeyPress.filter(key => key.pos.top);
export let SeqSidePress = SeqKeyPress.filter(key => key.pos.side);
export let SeqGridPress = SeqKeyPress.filter(key => key.pos.grid);