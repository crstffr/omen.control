import Rx from 'rxjs';
import {DeviceKeyPressStream} from './key';

let devices = {};
let DeviceNames = Rx.Observable.from(['seq', 'play']);

export let UnassignedDeviceKeyStream = DeviceKeyPressStream
    .filter(key => !key.device.name)
    .map(key => key.device);

export let AssignedDeviceReadyStream = Rx.Observable
    .zip(DeviceNames, UnassignedDeviceKeyStream)
    .map((zipped) => {
        let name = zipped[0];
        let device = zipped[1];
        device.name = name;
        return device;
    })
    .flatMap((device) => {

        return Rx.Observable.fromPromise(new Promise(resolve => {
            device.displayCharacter(device.name[0], 16);
            setTimeout(() => resolve(device), 1000);
        }));

        /* // Scrolling Text - a bit overkill
        return Rx.Observable.fromPromise(new Promise((resolve) => {
            device.scrollString(device.name, 50, 16, () => resolve(device));
        }));
        */
    })
    .do((device) => {
        device.clear();
    });