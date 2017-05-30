import Rx from 'rxjs';
import {InstState} from './state';
import {MIX_MODS} from '../mix/mods';
import {SEQ_MODS} from '../seq/mods';
import {SeqDevice} from '../seq/device';
import {Instruments} from '../inst/collection';
import {MixBotBtnPress} from '../mix/actions';
import {MixArrowLeft, MixArrowRight} from '../mix/actions';
import {SeqPagePress, SeqGridPress} from '../seq/actions';
import {PagePropertyCycler} from '../class/pagePropertyCycler';

const REPEAT = 'repeat';
const SPEED = 'speed';
const DELETE = 'delete';
const PLAYBACK = 'playback';

export let CURRENT_SEQ = {};

export let Sequence = Rx.Observable
    .combineLatest(InstState, SeqDevice)
    .map(([{inst: {sequence: seq}}]) => seq)
    .do(seq => { CURRENT_SEQ = seq;});

let PagePress = SeqPagePress
    .filter(() => !MIX_MODS.size)
    .map(({val}) => val);

export let SwitchPage = PagePress
    .filter(() => !SEQ_MODS.size)
    .do(val => { CURRENT_SEQ.page = val})
    .startWith({val: 1});

let StepPress = SeqGridPress
    .map((key) => {
        let i = (64 * (CURRENT_SEQ.page - 1)) + key.val;
        let step = CURRENT_SEQ.steps[i];
        return {i, key, step };
    });

export let ToggleStep = StepPress
    .filter(() => !SEQ_MODS.size)
    .filter(() => !MIX_MODS.size)
    .do(({step}) => step.toggle())
    .publish();

export let DeleteStep = StepPress
    .filter(() => SEQ_MODS.has(DELETE))
    .do(({step}) => step.clear())
    .publish();

export let DeletePage = PagePress
    .filter(() => SEQ_MODS.has(DELETE))
    .do(page => CURRENT_SEQ.clearPage(page))
    .publish();

export let DeleteAll = MixBotBtnPress
    .filter(() => SEQ_MODS.has(DELETE)).map(({inst}) => inst)
    .do(inst => Instruments[inst].sequence.clearAllSteps())
    .publish();

export let Redraw = Rx.Observable
    .combineLatest(Sequence, SwitchPage)
    .map(() => CURRENT_SEQ);

export let PageSpeedCycler = new PagePropertyCycler(Sequence, SEQ_MODS, SPEED);
export let PageRepeatCycler = new PagePropertyCycler(Sequence, SEQ_MODS, REPEAT);
export let PagePlaybackCycler = new PagePropertyCycler(Sequence, SEQ_MODS, PLAYBACK);

// Turn on our Hot Observables

ToggleStep.connect();
DeleteStep.connect();
DeletePage.connect();
DeleteAll.connect();