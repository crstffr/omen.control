import {LAUNCHCONTROL_ELEMS} from '../elems';
import {CtrlColors} from '../colors';
import events from 'events';
import midi from 'midi';

export class LaunchControl extends events.EventEmitter {

    input = new midi.input();
    output = new midi.output();

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
            let elem = this.elems[key];
            this.emit('action', [elem, val]);
            if (elem.btn) {
                elem.emit((val) ? 'press' : 'release');
            }
        });
    }

    sendMessage(msg) {
        this.output.sendMessage(msg);
        return this;
    }

    clear() {
        this.sendMessage([176, 0, 0]);
        return this;
    }

    disconnect() {
        this.input.closePort(this.port);
        this.output.closePort(this.port);
        return this;
    }

}

class LaunchControlXlElement extends events.EventEmitter {

    constructor (key, elem, output) {
        super();
        Object.assign(this, elem);
        this.output = output;
    }

    api = {
        dark: () => {
            this.output.sendMessage(sysex(this.idx, CtrlColors.off));
        },
        light: (color) => {
            this.output.sendMessage(sysex(this.idx, color));
        }
    }

}


function sysex(i, color) {
    return [240, 0, 32, 41, 2, 17, 120, 0, i, color, 247];
}