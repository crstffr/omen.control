import {LaunchPadDevice} from '../devices/launchpad';

export let SeqDevice = LaunchPadDevice.share()
    .filter(device => device.name === 'seq');
