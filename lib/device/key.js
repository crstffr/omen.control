import Rx from 'rxjs';
import {LaunchCtrlColors} from '../colors';
import {LaunchPadDevices, LaunchCtrlDevices} from './connect';

export let LAUNCHPAD_ELEMS = {};

/**
 * Precalculate the metadata for the elements.
 */
Array(9).fill().map((k, y) => {
    let top = (y === 8);
    return Array(9).fill().map((k, x) => {
        let side = (x === 8);
        let xy = String(x) + String(y);
        LAUNCHPAD_ELEMS[xy] = {
            x: x,
            y: y,
            xy: xy,
            val: (top) ? x + 1 : (side) ? y + 1 : (8 * y) + x + 1,
            pos: {
                top: top,
                side: side,
                grid: !top && !side
            }
        };
        return LAUNCHPAD_ELEMS[xy];
    });
});

export let LaunchpadKeyPress = LaunchPadDevices
    .flatMap(device => {
        return Rx.Observable.fromEvent(device, 'press').map((btn) => {
            let key = String(btn.x) + String(btn.y);
            let elem = Object.assign({}, LAUNCHPAD_ELEMS[key]);
            elem.device = device;
            elem.api = btn;
            return elem;
        });
    });

export let AssignedLaunchpadKeyPress = LaunchpadKeyPress
    .filter(key => key.device.name);


export let LaunchCtrlActions = LaunchCtrlDevices
    .flatMap(device => Rx.Observable.fromEvent(device, 'action'));

export let LaunchCtrlKeyPress = LaunchCtrlActions
    .filter(action => action.btn && action.val);

export let LaunchCtrlKeyRelease = LaunchCtrlActions
    .filter(action => action.btn && !action.val);

export let LaunchCtrlKnobChange = LaunchCtrlActions
    .filter(action => action.knob)
    .map(action => {
        return {
            row: action.row,
            inst: action.col,
            val: action.val
        };
    });

export let LaunchCtrlFadeChange = LaunchCtrlActions
    .filter(action => action.fade)
    .map(action => {
        return {
            inst: action.col,
            val: action.val
        };
    });