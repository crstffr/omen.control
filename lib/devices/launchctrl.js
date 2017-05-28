import death from 'death';
import {LaunchControlXL} from '../class/launchControl';
import {MidiInput, DevicePorts, DeviceConns} from '../device/conns';

let LaunchCtrlPorts = DevicePorts.filter((port) => {
    return MidiInput.getPortName(port) === 'Launch Control XL';
});

export let LaunchCtrlDevices = LaunchCtrlPorts
    .map(port => {
        let device = DeviceConns[port] || new LaunchControlXL(port);
        DeviceConns[port] = device;
        death(() => device.reset());
        return device;
    });