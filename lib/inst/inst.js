import Rx from 'rxjs';
import {Boot} from '../boot';
import {MIX_MODS} from '../mix/mods';
import {Instruments} from './collection';
import {SelectLayout} from '../note/actions';
import {SelectInst, ArrowKeys} from '../mix/actions';
import {InstCycler} from './cyclers';

export let CURRENT_INST = {};
export let inst = () => CURRENT_INST;

let InitialInst = Boot
    .map(() => state => Object.assign({}, state, {
        inst: Instruments[1]
    }));

let SelectedInst = SelectInst
    .filter(() => !MIX_MODS.size)
    .map(elem => state => Object.assign({}, state, {
        inst: Instruments[elem.inst]
    }));

export let InstrumentState = Rx.Observable
    .merge(InitialInst, SelectedInst)
    .scan((state, changeFn) => changeFn(state), {})
    .do(({inst}) => CURRENT_INST = inst);

/**
 * ----------------------
 * SET INSTRUMENT MIDI CHANNEL
 * ----------------------
 */

let NextMidiChannel = ArrowKeys.right
    .filter(() => MIX_MODS.has('channel'))
    .do(() => inst().nextChannel())
    .publish();

let PrevMidiChannel = ArrowKeys.left
    .filter(() => MIX_MODS.has('channel'))
    .do(() => inst().prevChannel())
    .publish();

export let MidiChannelChange = Rx.Observable
    .merge(NextMidiChannel, PrevMidiChannel);

/**
 * ----------------------
 * NOTE MODE CYCLERS
 * ----------------------
 */

export let Cyclers = {
    key: new InstCycler(InstrumentState, 'key'),
    scale: new InstCycler(InstrumentState, 'scale'),
    octave: new InstCycler(InstrumentState, 'octave')
};

/**
 * ----------------------
 * SET THE LAYOUT MODE
 * ----------------------
 */

let SetKeyboardMode = SelectLayout.keyboard
    .do(() => inst().setLayout('keyboard'))
    .publish();

let SetChordMode = SelectLayout.chord
    .do(() => inst().setLayout('chord'))
    .publish();

let SetDrumMode = SelectLayout.drum
    .do(() => inst().setLayout('drum'))
    .publish();

let SetArpMode = SelectLayout.arp
    .do(() => inst().setLayout('arp'))
    .publish();

let SetCcsMode = SelectLayout.ccs
    .do(() => inst().setLayout('ccs'))
    .publish();

export let ModeChange = Rx.Observable
    .merge(SetKeyboardMode, SetChordMode)
    .merge(SetDrumMode, SetArpMode)
    .merge(SetCcsMode)
    .publish();

export let SetInstMode = {
    keyboard: SetKeyboardMode,
    chord: SetChordMode,
    drum: SetDrumMode,
    arp: SetArpMode,
    ccs: SetCcsMode
};

/**
 * ----------------------
 * CONNECT HOT OBSERVABLES
 * ----------------------
 */

NextMidiChannel.connect();
PrevMidiChannel.connect();
SetKeyboardMode.connect();
SetChordMode.connect();
SetDrumMode.connect();
SetArpMode.connect();
SetCcsMode.connect();
ModeChange.connect();
