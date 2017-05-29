import Rx from 'rxjs';
import {SeqDevice} from '../device';
import {SeqSideElems} from '../elems';
import {LaunchPadColors} from '../../colors';

let _keyVal = 8;
let _keyName = 'length';
let _keyColor = LaunchPadColors.green.low;

let _state = (bool) => ([_keyName, bool]);
let _key = (key) => SeqSideElems.filter(key => key.val === _keyVal)[0];

let OnKey = Rx.Observable.merge(SeqDevice)
    .flatMap(seq => Rx.Observable.from([_key()]));

let KeyPress = OnKey
    .flatMap(key => Rx.Observable.fromEvent(key.api, 'press'));

let Activate = KeyPress
    .map(() => state => _state(true));

let KeyRelease = OnKey
    .flatMap(key => Rx.Observable.fromEvent(key.api, 'release'));

let Deactivate = KeyRelease
    .map(() => state => _state(false));

export let State = Rx.Observable.merge(Activate, Deactivate)
    .scan((state, changeFn) => changeFn(state), _state(false));

State.subscribe(([name, bool]) => {
    _key().api.light((bool) ? _keyColor : LaunchPadColors.off);
});