import Rx from 'rxjs';
import {LaunchpadKeyPress} from './key';

let DeviceNames = Rx.Observable.from(['seq', 'note']);

export let UnassignedDeviceKey = LaunchpadKeyPress
    .filter(key => !key.device.name)
    .map(key => key.device);

export let AssignedDeviceReady = Rx.Observable
    .zip(DeviceNames, UnassignedDeviceKey)
    .map((zipped) => {
        let name = zipped[0];
        let device = zipped[1];
        device.name = name;
        return device;
    })
    .do((device) => {
        device.displayCharacter(device.name[0], 16);
    })
    .flatMap((device) => {
        return Rx.Observable.timer(1000).map(() => device);
    })
    .do((device) => {
        device.clear();
    });