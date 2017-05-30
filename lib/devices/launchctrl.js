import {Death} from '../death';
import {LaunchControl} from '../class/launchCtrl';
import {MidiInput, DevicePorts, DeviceConns} from '../device/conns';

let LaunchCtrlPorts = DevicePorts.filter((port) => {
    return MidiInput.getPortName(port) === 'Launch Control XL';
});

export let LaunchCtrlDevices = LaunchCtrlPorts
    .map(port => {
        let device = DeviceConns[port] || new LaunchControl(port);
        DeviceConns[port] = device;
        return device;
    });