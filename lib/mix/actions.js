import Rx from 'rxjs';
import {SEQ_MODS} from '../seq/mods';
import {MixDevice} from './device'

export let MixActions = MixDevice
    .flatMap(device => Rx.Observable.fromEvent(device, 'action'))
    .filter(([action]) => action)
    .map(([action, val]) => {
       action.val = val;
       return action;
    });

export let MixPressAction = MixActions
    .filter(action => action.btn && action.val);

export let MixReleaseAction = MixActions
    .filter(action => action.btn && !action.val);

export let MixKnobAction = MixActions
    .filter(action => action.knob)
    .map(action => {
        return {
            row: action.row,
            inst: action.col,
            val: action.val
        };
    });

export let MixFadeAction = MixActions
    .filter(action => action.fade)
    .map(action => {
        return {
            inst: action.col,
            val: action.val
        };
    });

export let MixTopBtnPress = MixPressAction
    .filter(elem => elem.row === 5);

export let MixBotBtnPress = MixPressAction
    .filter(elem => elem.row === 6);

export let SelectInst = MixBotBtnPress
    .filter(() => !SEQ_MODS.size);
