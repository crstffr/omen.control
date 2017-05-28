import {LaunchPadPressAction} from '../devices/launchpad';

export let SeqKeyPress = LaunchPadPressAction
    .filter(key => key.device.name === 'seq');

export let SeqPagePress = SeqKeyPress.filter(key => key.pos.top);
export let SeqSidePress = SeqKeyPress.filter(key => key.pos.side);
export let SeqGridPress = SeqKeyPress.filter(key => key.pos.grid);