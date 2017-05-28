import Rx from 'rxjs';
import Midi from 'midi';

export let MidiInput = new Midi.input();
export let DeviceConns = {}; // reuse midi connections
export let DevicePorts = Rx.Observable.range(0, MidiInput.getPortCount());