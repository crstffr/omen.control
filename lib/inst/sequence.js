import Rx from 'rxjs';
import {InstState} from './state';
import {SeqDevice} from '../seq/device';
import {SeqPagePress, SeqGridPress} from '../seq/actions';

export let CURRENT_SEQ = {};

export let Page = SeqPagePress
    .map(({val}) => val)
    .do(val => { CURRENT_SEQ.page = val})
    .startWith({val: 1});

export let Sequence = Rx.Observable
    .combineLatest(InstState, SeqDevice)
    .map(([{inst: {sequence: seq}}]) => seq)
    .do(seq => { CURRENT_SEQ = seq;});

export let Redraw = Rx.Observable
    .combineLatest(Sequence, Page)
    .map(([seq]) => seq);


export let SequenceToggleStep = SeqGridPress
    .map((key) => {
        let i = (64 * (CURRENT_SEQ.page - 1)) + key.val;
        let step = CURRENT_SEQ.steps[i];
        let active = step.toggle();
        return {
            i,
            key,
            step,
            active,
        }
    });