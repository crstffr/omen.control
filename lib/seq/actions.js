import Rx from 'rxjs';
import {LaunchPadPressAction} from '../devices/launchpad';

export let SeqPressAction = LaunchPadPressAction.filter(key => key.device.name === 'seq');
export let SeqPagePress = SeqPressAction.filter(key => key.pos.top);
export let SeqSidePress = SeqPressAction.filter(key => key.pos.side);
export let SeqGridPress = SeqPressAction.filter(key => key.pos.grid);

export let SeqGridArrows = {
    up: SeqGridPress.filter(key => key.xy === '76'),
    down: SeqGridPress.filter(key => key.xy === '77'),
}