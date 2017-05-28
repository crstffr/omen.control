import {AssignedDeviceReady} from '../device/assign';

export let SeqReady = AssignedDeviceReady.share()
    .filter(device => device.name === 'seq');
