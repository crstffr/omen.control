
import Rx from 'rxjs';
import Midi from 'midi';
import MidiLaunchpad from 'midi-launchpad';

let conns = {};
let devices = {};
let deviceNames = ['seq', 'play'];

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

export let LaunchpadConnectStream = Rx.Observable.range(0, input.getPortCount())
    .filter((port) => {
        let input = new Midi.input();
        return input.getPortName(port).indexOf('Launchpad') >= 0;
    })
    .flatMap((port) => {
        let launchpad = conns[port] || MidiLaunchpad.connect(port, false);
        launchpad.port = port;
        conns[port] = launchpad;
        return Rx.Observable.fromEvent(launchpad, 'ready');
    })
    .map((launchpad, i) => {
        launchpad.displayCharacter('?');
        launchpad.idx = i;
        return launchpad;
    });

export let LaunchpadKeyPressStream = LaunchpadConnectStream
    .flatMap((launchpad) => {
        return Rx.Observable.fromEvent(launchpad, 'press').map((btn) => {
            let key = Object.assign({}, KEYS[btn.y][btn.x]);
            key.parent = launchpad;
            return key;
        });
    }).map((key) => {
        if (!key.parent.name) {
            deviceNames.forEach((name) => {
                if (key.parent.name || devices[name]) { return; }
                key.parent.name = name;
                devices[name] = key.parent;
                key.parent.displayCharacter(name[0], 16);
            });
        }
        return key;
    });

export let SeqKeyPressStream = LaunchpadKeyPressStream
    .filter((key) => {
        return key.parent.name === 'seq';
    });

export let SeqGridPressStream = SeqKeyPressStream
    .filter((key) => {
        return key.pos.grid;
    });

export let PlayKeyPressStream = LaunchpadKeyPressStream
    .filter((key) => {
        return key.parent.name === 'play';
    });

