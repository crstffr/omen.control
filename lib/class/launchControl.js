import events from 'events';
import Midi from 'midi';


export let LAUNCHCONTROL_ELEMS = {};

/**
 * Precalculate the metadata for the elements.
 */
Array(9).fill().map((v, row) => {
    row = row + 1;
    let cols = (row <= 6) ? 8 : (row < 9) ? 2 : 4;
    Array(cols).fill().map((v, col) => {
        col = col + 1;
        let key = String(row) + String(col);
        let knob = row <= 3;
        let fade = row == 4;
        let btn = !knob && !fade;
        let idx = getIndex(row, col);
        LAUNCHCONTROL_ELEMS[key] = {
            key, row, col, knob, fade, btn, idx
        };
    });
});

/**
 * Figure out the internal numbering system for a given element.
 * Details taken from: https://goo.gl/If5pgM
 */
function getIndex(row, col, i) {
    switch (row) {
        case 1:
        case 2:
        case 3:
            return (8 * (row - 1)) + col - 1;
            break;
        case 5:
        case 6:
            return (8 * (row - 2)) + col - 1;
            break;
        case 7:
        case 8:
            return ((row - 7) * 2) + 44 + col - 1;
            break;
        case 9:
            return 40 + col - 1;
            break;
    }
}


export class LaunchControlXL extends events.EventEmitter {

    input = new Midi.input();
    output = new Midi.output();

    constructor (port, channel) {
        super();
        this.port = port;
        this.input.openPort(port);
        this.output.openPort(port);

        this.input.on('message', (time, msg) => {
            this.emit('action', new LaunchControlXlElement(msg[1], msg[2], this.output));
        });
    }

    static colors = {
        off: 12,
        red: {
            low: 13,
            full: 15
        },
        amber: {
            low: 87,
            full: 91
        },
        yellow: {
            low: 62,
            full: 62
        },
        green: {
            low: 28,
            full: 60
        }
    }

    destroy () {
        this.input.closePort();
        this.output.closePort();
    }

    sendMessage(msg) {
        this.output.sendMessage(msg);
    }

    reset() {
        this.sendMessage([176, 0, 0]);
    }

    ledOff(key) {
        this.sendMessage([]);
    }

}

class LaunchControlXlElement {

    constructor (key, val, output) {
        Object.assign(this, LAUNCHCONTROL_ELEMS[key], {val: val});
        this.output = output;
    }

    api = {
        off: () => {
            this.output.sendMessage(sysex(this.idx, LaunchControlXL.colors.off));
        },
        light: (color) => {
            this.output.sendMessage(sysex(this.idx, color));
        }
    }

}

function sysex(i, color) {
    return [240, 0, 32, 41, 2, 17, 120, 0, i, color, 247];
}