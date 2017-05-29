import Rx from 'rxjs';
import midi from 'midi';

export let MidiInput = new midi.input();
export let DeviceConns = {}; // reuse midi connections
export let DevicePorts = Rx.Observable.range(0, MidiInput.getPortCount());