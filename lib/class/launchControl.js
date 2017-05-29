import {LAUNCHCONTROL_ELEMS} from '../elems';
import {LaunchCtrlColors} from '../colors';
import events from 'events';
import death from 'death';
import Midi from 'midi';

export class LaunchControlXL extends events.EventEmitter {

    input = new Midi.input();
    output = new Midi.output();

    constructor (port, channel) {
        super();
        this.elems = {};
        this.port = port;
        this.input.openPort(port);
        this.output.openPort(port);

        Object.keys(LAUNCHCONTROL_ELEMS).forEach(k => {
            let elem = LAUNCHCONTROL_ELEMS[k];
            this.elems[k] = new LaunchControlXlElement(k, elem, this.output);
        });

        this.input.on('message', (time, msg) => {
            let [id, key, val] = msg;
            this.emit('action', [this.elems[key], val]);
        });
    }

    sendMessage(msg) {
        this.output.sendMessage(msg);
        return this;
    }

    reset() {
        this.sendMessage([176, 0, 0]);
        return this;
    }

    disconnect() {
        this.input.closePort(this.port);
        this.output.closePort(this.port);
        return this;
    }

}

class LaunchControlXlElement {

    constructor (key, elem, output) {
        Object.assign(this, elem);
        this.output = output;
    }

    api = {
        off: () => {
            this.output.sendMessage(sysex(this.idx, LaunchCtrlColors.off));
        },
        light: (color) => {
            this.output.sendMessage(sysex(this.idx, color));
        }
    }

}


function sysex(i, color) {
    return [240, 0, 32, 41, 2, 17, 120, 0, i, color, 247];
}