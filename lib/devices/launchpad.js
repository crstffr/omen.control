import Rx from 'rxjs';
import NovLaunchPad from 'midi-launchpad';
import {MapLaunchPadBtn} from '../elems';
import {LaunchPadColors} from '../colors';
import {MidiInput, DeviceConns, DevicePorts} from '../device/conns';

let LaunchPadNames = Rx.Observable.from(['seq', 'note']);

let LaunchPadPorts = DevicePorts.filter((port) => {
    return MidiInput.getPortName(port) === 'Launchpad Mini';
});

let LaunchPadDevices = LaunchPadPorts
    .flatMap(port => {
        let device = DeviceConns[port] || NovLaunchPad.connect(port, false);
        device.port = port;
        DeviceConns[port] = device;
        return Rx.Observable.fromEvent(device, 'ready');
    })
    .map((device, i) => {
        device.idx = i;
        device.clear();
        device.displayCharacter('?', LaunchPadColors.red.low);
        return device;
    });

let AnyLaunchPadPressAction = LaunchPadDevices
    .flatMap(device => Rx.Observable.fromEvent(device, 'press'))
    .map(MapLaunchPadBtn);

let AnyLaunchPadReleaseAction = LaunchPadDevices
    .flatMap(device => Rx.Observable.fromEvent(device, 'release'))
    .map(MapLaunchPadBtn);

let UnassignedLaunchPadPressAction = AnyLaunchPadPressAction
    .filter(key => !key.device.name)
    .map(key => key.device);

export let LaunchPadDevice = Rx.Observable
    .zip(LaunchPadNames, UnassignedLaunchPadPressAction)
    .map((zipped) => {
        let name = zipped[0];
        let device = zipped[1];
        device.ready = false;
        device.name = name;
        return device;
    })
    .do((device) => {
        device.displayCharacter(device.name[0], 16);
    })
    .flatMap((device) => {
        return Rx.Observable.timer(500).map(() => device);
    })
    .do((device) => {
        device.clear();
    })
    .map((device) => {
        device.ready = true;
        return device;
    });

export let LaunchPadPressAction = AnyLaunchPadPressAction
    .filter(key => key.device.ready);

export let LaunchPadReleaseAction = AnyLaunchPadReleaseAction
    .filter(key => key.device.ready);

export let LaunchPadAction = Rx.Observable
    .merge(LaunchPadPressAction, LaunchPadReleaseAction);