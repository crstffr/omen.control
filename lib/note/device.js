import {LaunchPadDevices} from '../devices/launchpad';

export let NoteDevice = LaunchPadDevices.share()
    .filter(device => device.name === 'note');
