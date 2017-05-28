import Rx from 'rxjs';
import {SeqDevice} from '../device';
import {SeqSideElems} from '../elems';
import {LaunchPadColors} from '../../colors';

let _keyVal = 6;
let _keyName = 'delete';
let _keyColor = LaunchPadColors.red.low;

let _key = (key) => SeqSideElems.filter(key => key.val === _keyVal)[0];
let _state = (bool, o = {}) => { o[_keyName] = bool; return o; };

let OnKey = Rx.Observable.merge(SeqDevice)
    .flatMap(seq => Rx.Observable.from([_key()]));

let KeyPress = OnKey
    .flatMap(key => Rx.Observable.fromEvent(key.api, 'press'));

let KeyRelease = OnKey
    .flatMap(key => Rx.Observable.fromEvent(key.api, 'release'));

let Activate = KeyPress
    .map(() => state => Object.assign({}, state, _state(true)));

let Deactivate = KeyRelease
    .map(() => state => Object.assign({}, state, _state(false)));

export let State = Rx.Observable.merge(Activate, Deactivate)
    .scan((state, changeFn) => changeFn(state), _state(false));

State.subscribe((state) => {
    _key().api.light((state[_keyName]) ? _keyColor : LaunchPadColors.off);
});