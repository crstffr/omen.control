import Rx from 'rxjs';
import {MixDevice} from '../device';
import {MixModifierElems} from '../elems';
import {LaunchCtrlColors} from '../../colors';
import {MixModifierBtnPress, MixModifierBtnRelease} from '../actions';

let _keyVal = 1;
let _keyName = 'channel';
let _keyColor = LaunchCtrlColors.modifier.full;

let _state = (bool) => ([_keyName, bool]);
let _key = (key) => MixModifierElems.filter(key => key.col === _keyVal)[0];

let KeyPress = MixModifierBtnPress
    .filter(({col}) => col === _keyVal);

let KeyRelease = MixModifierBtnRelease
    .filter(({col}) => col === _keyVal);

let Activate = KeyPress
    .map(() => state => _state(true));

let Deactivate = KeyRelease
    .map(() => state => _state(false));

export let State = Rx.Observable.merge(Activate, Deactivate)
    .scan((state, changeFn) => changeFn(state), _state(false));

State.subscribe(([name, bool]) => {
    _key().api.light((bool) ? _keyColor : LaunchCtrlColors.off);
});