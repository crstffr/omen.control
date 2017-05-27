import Rx from 'rxjs';
import {DeviceConnectStream} from './connect';

const KEYS = Array(9).fill().map((k, y) => {
    let top = (y === 8);
    return Array(9).fill().map((k, x) => {
        let side = (x === 8);
        return {
            x: x,
            y: y,
            xy: String(x) + String(y),
            pos: {
                top: top,
                side: side,
                grid: !top && !side
            }
        }
    });
});

export let DeviceKeyPressStream = DeviceConnectStream
    .flatMap((device) => {
        return Rx.Observable.fromEvent(device, 'press').map((btn) => {
            let key = Object.assign({}, KEYS[btn.y][btn.x]);
            key.device = device;
            return key;
        });
    });

