import Rx from 'rxjs';
import {InstrumentState} from './inst';
import {MIX_MODS} from '../mix/mods';
import {SeqModsChange} from '../seq/mods';
import {SeqMods, SEQ_MODS} from '../seq/mods';
import {SeqDevice} from '../seq/device';
import {Instruments} from '../inst/collection';
import {MixBotBtnPress} from '../mix/actions';
import {SeqPagePress, SeqGridPress} from '../seq/actions';
import {ArrowKeys} from '../mix/actions';

import {PageCycler} from './cyclers';

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
    .combineLatest(InstrumentState, SeqDevice)
    .map(([{inst: {sequence: seq}}]) => seq)
    .do(seq => { CURRENT_SEQ = seq;});

/**
 * ----------------------
 * PAGE PROPERTY CYCLERS
 * ----------------------
 */

export let Cyclers = {
    speed: new PageCycler(Sequence, SPEED),
    repeat: new PageCycler(Sequence, REPEAT),
    playback: new PageCycler(Sequence, PLAYBACK)
};

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
    .filter(() => !SEQ_MODS.size)
    .filter(() => !MIX_MODS.size)
    .do(({step}) => {
        seq().pages.forEach(page => page.deselectAllSteps());
        step.selectToggle();
    })
    .publish();

export let SelectSteps = StepPress
    .filter(() => SEQ_MODS.has(SELECT))
    .do(({step}) => step.selectToggle())
    .publish();

export let SelectPage = PagePress
    .filter(() => SEQ_MODS.has(SELECT))
    .do(page => {
        let p = seq().getPage(page);
        let c1 = p.steps.filter(step => step.notes.size).length;
        let c2 = p.steps.filter(step => step.selected).length;
        (c2 === 0) ? p.selectActiveSteps() : p.deselectAllSteps();
    }).publish();

export let ToggleStep = StepPress
    .filter(() => !SEQ_MODS.size)
    .filter(() => !MIX_MODS.size)
    .publish();

export let TieStep = StepPress
    .filter(() => SEQ_MODS.has('tie'))
    .filter(() => seq().getSelectedSteps().length === 1)
    .do(tiedto => {
        let step = seq().getSelectedSteps()[0];
        if (tiedto.i < step.i || !step.notes.size) { return; }
        step.tiedto = (step.i !== tiedto.i) ? tiedto.i : 0;
    }).publish();

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

let MoveUp = ArrowKeys.up
    .filter(() => SEQ_MODS.has(POSITION))
    .do(() => seq().moveSelectedSteps(-8))
    .publish();

let MoveDown = ArrowKeys.down
    .filter(() => SEQ_MODS.has(POSITION))
    .do(() => seq().moveSelectedSteps(8))
    .publish();

let MoveLeft = ArrowKeys.left
    .filter(() => SEQ_MODS.has(POSITION))
    .do(() => seq().moveSelectedSteps(-1))
    .publish();

let MoveRight = ArrowKeys.right
    .filter(() => SEQ_MODS.has(POSITION))
    .do(() => seq().moveSelectedSteps(1))
    .publish();

/**
 * ----------------------
 * SEQUENCE REDRAWS
 * ----------------------
 */

export let Redraw = Rx.Observable
    .combineLatest(Sequence, SwitchPage)
    .merge(DeletePage, DeleteStep, ToggleStep, SelectStep)
    .merge(SelectPage, SelectSteps, CopySteps, TieStep)
    .merge(MoveLeft, MoveRight)
    .merge(MoveUp, MoveDown)
    .map(() => CURRENT_SEQ);

export let PlaybackUpdates = Rx.Observable
    .merge(DeletePage, DeleteStep, DeleteAll, TieStep)
    .merge(MoveLeft, MoveRight, MoveUp, MoveDown)
    .merge(LengthChange)
    .merge(CopySteps)
    .merge(Cyclers.speed.change)
    .merge(Cyclers.repeat.change)
    .merge(Cyclers.playback.change);

/**
 * ----------------------
 * CONNECT HOT OBSERVABLES
 * ----------------------
 */

SelectSteps.connect();
SelectStep.connect();
SelectPage.connect();
ToggleStep.connect();
CopySteps.connect();
TieStep.connect();

DeleteAll.connect();
DeleteStep.connect();
DeletePage.connect();

LengthReset.connect();
LengthChange.connect();

MoveUp.connect();
MoveDown.connect();
MoveLeft.connect();
MoveRight.connect();


