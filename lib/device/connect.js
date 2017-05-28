
import Rx from 'rxjs';
import Midi from 'midi';
import NovLaunchPad from 'midi-launchpad';
import {LaunchControlXL} from '../class/launchControl';

let input = new Midi.input();
let conns = {}; // reuse midi connections

let Devices = Rx.Observable.range(0, input.getPortCount());

/**
 * Launch Control Devices (mixer)
 */

export let LaunchPadPorts = Devices.filter((port) => {
    return input.getPortName(port) === 'Launchpad Mini';
});

export let LaunchPadDevices = LaunchPadPorts
    .flatMap(port => {
        let device = conns[port] || NovLaunchPad.connect(port, false);
        device.port = port;
        conns[port] = device;
        return Rx.Observable.fromEvent(device, 'ready');
    })
    .map((device, i) => {
        device.idx = i;
        device.clear();
        device.displayCharacter('?', 45);
        return device;
    });

/**
 * Launch Control Devices (mixer)
 */

export let LaunchCtrlPorts = Devices.filter((port) => {
    return input.getPortName(port) === 'Launch Control XL';
});

export let LaunchCtrlDevices = LaunchCtrlPorts
    .map(port => {
        let device = conns[port] || new LaunchControlXL(port);
        conns[port] = device;
        device.reset();
        return device;
    })
    .do(device => {

        /*
        input.on('message', function(deltaTime, message) {
            console.log('msg', message);
        });

        console.log('launch control port', port);

        output.sendMessage([176, 0, 0]);

        output.sendMessage([240, 0, 32, 41, 2, 17, 120, 0, 32, 15, 247]);
        */


    });

