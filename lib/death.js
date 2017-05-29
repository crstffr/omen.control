import Rx from 'rxjs';
import death from 'death';
import {DeviceConns} from './device/conns';

let onDeath = new Promise((resolve) => {
    death(resolve);
});

Rx.Observable.fromPromise(onDeath).subscribe(() => {

    Object.keys(DeviceConns).forEach((k) => {
        let device = DeviceConns[k];

        if (device.clear) {
            device.clear();
        }

        if (device.input) {
            device.input.closePort(device.port);
        }

        if (device.output) {
            device.output.closePort(device.port);
        }
    });

    process.exit();

});