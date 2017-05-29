import Rx from 'rxjs';
import {SeqDevice} from '../device';
import {SeqSideElems} from '../elems';
import {LaunchPadColors} from '../../colors';
import {MIX_MODS} from '../../mix/mods';

let _keyVal = 6;
let _keyName = 'delete';
let _keyColor = LaunchPadColors.red.low;

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
    .filter(() => !MIX_MODS.size)
    .scan((state, changeFn) => changeFn(state), _state(false));

State.subscribe(([name, bool]) => {
    _key().api.light((bool) ? _keyColor : LaunchPadColors.off);
});