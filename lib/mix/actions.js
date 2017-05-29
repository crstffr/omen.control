import Rx from 'rxjs';
import {SEQ_MODS} from '../seq/mods';
import {MixDevice} from './device'

export let MixActions = MixDevice.share()
    .flatMap(device => Rx.Observable.fromEvent(device, 'action'))
    .filter(([action]) => action)
    .map(([action, val]) => {
       action.val = val;
       return action;
    });

export let MixPressAction = MixActions.share()
    .filter(action => action.btn && action.val);

export let MixReleaseAction = MixActions.share()
    .filter(action => action.btn && !action.val);

export let MixKnobAction = MixActions.share()
    .filter(action => action.knob)
    .map(action => {
        return {
            row: action.row,
            inst: action.col,
            val: action.val
        };
    });

export let MixFadeAction = MixActions.share()
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

export let MixVertArrowPress = MixPressAction
    .filter(elem => elem.row === 7);

export let MixHorzArrowPress = MixPressAction
    .filter(elem => elem.row === 8);

export let MixModifierBtnPress = MixPressAction
    .filter(elem => elem.row === 9);

export let MixModifierBtnRelease = MixReleaseAction
    .filter(elem => elem.row === 9);

export let SelectInst = MixBotBtnPress
    .filter(() => !SEQ_MODS.size);


export let MixArrowUp = MixVertArrowPress
    .filter(key => key.col === 1);

export let MixArrowDown = MixVertArrowPress
    .filter(key => key.col === 2);

export let MixArrowLeft = MixHorzArrowPress
    .filter(key => key.col === 1);

export let MixArrowRight = MixHorzArrowPress
    .filter(key => key.col === 2);