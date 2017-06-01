import Rx from 'rxjs';
import {LaunchPadPressAction} from '../devices/launchpad';

let PressAction = LaunchPadPressAction
    .filter(key => key.device.name === 'note');

PressAction.do(() => {console.log('press action')});

let SidePress = PressAction.filter(key => key.pos.side);
let GridPress = PressAction.filter(key => key.pos.grid);
let TopPress = PressAction.filter(key => key.pos.top);

export let SelectLayout = {
    keyboard: TopPress.filter(key => key.val === 1),
    chord: TopPress.filter(key => key.val === 2),
    arp: TopPress.filter(key => key.val === 3),
    drum: TopPress.filter(key => key.val === 4),
};
