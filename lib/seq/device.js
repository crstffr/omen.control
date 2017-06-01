import {LaunchPadDevices} from '../devices/launchpad';

export let SeqDevice = LaunchPadDevices
    .filter(device => device.name === 'seq');
