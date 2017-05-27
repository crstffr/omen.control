
import Rx from 'rxjs';
import Midi from 'midi';
import MidiLaunchpad from 'midi-launchpad';

let input = new Midi.input();

let conns = {};

export let DeviceConnectStream = Rx.Observable.range(0, input.getPortCount())
    .filter((port) => {

        return input.getPortName(port).indexOf('Launchpad') >= 0;

    })
    .flatMap((port) => {

        let device = conns[port] || MidiLaunchpad.connect(port, false);
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