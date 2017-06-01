import Rx from 'rxjs';
import NovLaunchPad from 'midi-launchpad';
import {MapLaunchPadBtn} from '../elems';
import {PadColors} from '../colors';
import {Font} from '../tools/font';
import {MidiInput, DeviceConns, DevicePorts} from '../device/conns';

let LaunchPadNames = {
    'Launchpad Mini 2': 'seq',
    'Launchpad Mini 3': 'note',
};

let LaunchPadPorts = DevicePorts
    .map(port => [port, MidiInput.getPortName(port)])
    .filter(([port, name]) => name.indexOf('Launchpad Mini') > -1);

export let LaunchPadDevices = LaunchPadPorts
    .flatMap(([port, name]) => {
        let device = DeviceConns[port] || NovLaunchPad.connect(port, false);
        device.name = LaunchPadNames[name];
        device.port = port;
        DeviceConns[port] = device;
        return Rx.Observable.fromEvent(device, 'ready');
    })
    .map((device, i) => {
        device.idx = i;
        device.clear();
        return device;
    })
    .publish();



export let LaunchPadPressAction = LaunchPadDevices
    .flatMap(device => Rx.Observable.fromEvent(device, 'press'))
    .map(MapLaunchPadBtn);

export let LaunchPadReleaseAction = LaunchPadDevices
    .flatMap(device => Rx.Observable.fromEvent(device, 'release'))
    .map(MapLaunchPadBtn);

export let LaunchPadAction = Rx.Observable
    .merge(LaunchPadPressAction, LaunchPadReleaseAction);


LaunchPadDevices.connect();