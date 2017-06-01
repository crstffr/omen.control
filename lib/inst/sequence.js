import Rx from 'rxjs';
import {InstState} from './state';
import {MIX_MODS} from '../mix/mods';
import {SeqModsChange} from '../seq/mods';
import {SeqMods, SEQ_MODS} from '../seq/mods';
import {SeqDevice} from '../seq/device';
import {Instruments} from '../inst/collection';
import {MixBotBtnPress} from '../mix/actions';
import {SeqPagePress, SeqGridPress} from '../seq/actions';
import {MixArrowLeft, MixArrowRight} from '../mix/actions';
import {MixArrowUp, MixArrowDown} from '../mix/actions';
import {PagePropertyCycler} from '../class/pagePropertyCycler';

const COPY = 'copy';
const SPEED = 'speed';
const REPEAT = 'repeat';
const DELETE = 'delete';
const SELECT = 'select';
const POSITION = 'position';
const PLAYBACK = 'playback';

export let CURRENT_SEQ = {};
let seq = () => CURRENT_SEQ;
let p = () => seq().getPage();

export let Sequence = Rx.Observable
    .combineLatest(InstState, SeqDevice)
    .map(([{inst: {sequence: seq}}]) => seq)
    .do(seq => { CURRENT_SEQ = seq;});

export let PageSpeedCycler = new PagePropertyCycler(Sequence, SEQ_MODS, SPEED);
export let PageRepeatCycler = new PagePropertyCycler(Sequence, SEQ_MODS, REPEAT);
export let PagePlaybackCycler = new PagePropertyCycler(Sequence, SEQ_MODS, PLAYBACK);

/**
 * ----------------------
 * PAGE SELECTION
 * ----------------------
 */

let PagePress = SeqPagePress
    .filter(() => !MIX_MODS.size)
    .map(({val}) => val);

export let SwitchPage = PagePress
    .filter(() => !SEQ_MODS.size)
    .do(val => { seq().page = val})
    .startWith({val: 1});

/**
 * ----------------------
 * SELECT / TOGGLE STEPS
 * ----------------------
 */

let StepPress = SeqGridPress
    .map((key) => {
        let i = (64 * (seq().page - 1)) + key.val;
        let step = seq().steps[i];
        return {i, key, step };
    });

export let SelectStep = StepPress
    .filter(({step}) => step.active)
    .filter(() => SEQ_MODS.has('select'))
    .do(({step}) => step.selectToggle())
    .publish();

export let SelectPage = PagePress
    .filter(() => SEQ_MODS.has(SELECT))
    .do(page => {
        let p = seq().getPage(page);
        let c1 = p.steps.filter(step => step.active).length;
        let c2 = p.steps.filter(step => step.selected).length;
        (c1 !== c2) ? p.selectActiveSteps() : p.deselectAllSteps();
    }).publish();

export let ToggleStep = StepPress
    .filter(() => !SEQ_MODS.size)
    .filter(() => !MIX_MODS.size)
    .do(({step}) => step.toggle())
    .publish();

/**
 * ----------------------
 * DELETE STEPS
 * ----------------------
 */

export let DeleteStep = StepPress
    .filter(() => SEQ_MODS.has(DELETE))
    .do(({step}) => step.reset())
    .publish();

export let DeletePage = PagePress
    .filter(() => SEQ_MODS.has(DELETE))
    .do(page => seq().getPage(page).clearSteps())
    .publish();

export let DeleteAll = MixBotBtnPress
    .filter(() => SEQ_MODS.has(DELETE)).map(({inst}) => inst)
    .do(inst => Instruments[inst].sequence.resetAllPages())
    .publish();

/**
 * ----------------------
 * COPY STEPS
 * ----------------------
 */

let CopySteps = StepPress
    .filter(() => SEQ_MODS.has(COPY))
    .do(({step}) => seq().copySelectedSteps(step))
    .publish();

/*
let CopyPage = PagePress
    .filter(() => SEQ_MODS.has(COPY))
    .publish();

let CopyInst = MixBotBtnPress
    .filter(() => SEQ_MODS.has(COPY))
    .publish();
*/

/**
 * ----------------------
 * SET PAGE LENGTH
 * ----------------------
 */

let LengthReset = SeqModsChange
    .filter(([mod]) => mod === 'length')
    .do(() => p().temp.a = p().temp.b = 0)
    .publish();

export let LengthChange = StepPress
    .filter(() => SEQ_MODS.has('length'))
    .do(({key}) => {
        let t = p().temp;
        t[(!t.a) ? 'a' : 'b'] = key.val;
        if (t.a && t.b) {
            let a = t.a, b = t.b, c = (a < b);
            p().start = c ? a : b;
            p().end = c ? b : a;
            t.a = t.b = 0;
        }
    }).publish();

/**
 * ----------------------
 * SET STEP POSITION
 * ----------------------
 */

export let MoveRight = MixArrowRight
    .filter(() => SEQ_MODS.has(POSITION))
    .do(() => seq().moveSelectedSteps(1))
    .publish();

export let MoveLeft = MixArrowLeft
    .filter(() => SEQ_MODS.has(POSITION))
    .do(() => seq().moveSelectedSteps(-1))
    .publish();

export let MoveUp = MixArrowUp
    .filter(() => SEQ_MODS.has(POSITION))
    .do(() => seq().moveSelectedSteps(-8))
    .publish();

export let MoveDown = MixArrowDown
    .filter(() => SEQ_MODS.has(POSITION))
    .do(() => seq().moveSelectedSteps(8))
    .publish();

/**
 * ----------------------
 * SEQUENCE REDRAWS
 * ----------------------
 */

export let Redraw = Rx.Observable
    .combineLatest(Sequence, SwitchPage)
    .merge(DeletePage, DeleteStep, ToggleStep)
    .merge(SelectPage, SelectStep, CopySteps)
    .merge(MoveLeft, MoveRight)
    .merge(MoveUp, MoveDown)
    .map(() => CURRENT_SEQ);

/**
 * ----------------------
 * CONNECT HOT OBSERVABLES
 * ----------------------
 */

SelectStep.connect();
SelectPage.connect();
ToggleStep.connect();
CopySteps.connect();

DeleteAll.connect();
DeleteStep.connect();
DeletePage.connect();

LengthReset.connect();
LengthChange.connect();

MoveUp.connect();
MoveDown.connect();
MoveLeft.connect();
MoveRight.connect();


