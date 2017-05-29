import Rx from 'rxjs';
import {Boot} from '../boot';
import {MIX_MODS} from '../mix/mods';
import {MixArrowLeft, MixArrowRight} from '../mix/actions';
import {Instruments} from './collection';
import {SelectInst} from '../mix/actions';

let InitialInst = Boot
    .map(() => state => Object.assign({}, state, {inst: Instruments[1]}));

let SelectedInst = SelectInst
    .filter(() => !MIX_MODS.size)
    .map(elem => state => Object.assign({}, state, {inst: Instruments[elem.inst]}));

export let InstState = Rx.Observable
    .merge(InitialInst, SelectedInst)
    .scan((state, changeFn) => changeFn(state), {});

let SetInstChannelNext = Rx.Observable
    .combineLatest(InstState, MixArrowRight)
    .filter(() => MIX_MODS.has('channel'))
    .map(([{inst}]) => inst)
    .do((inst) => inst.nextChannel())
    .publish();

let SetInstChannelPrev = Rx.Observable
    .combineLatest(InstState, MixArrowLeft)
    .filter(() => MIX_MODS.has('channel'))
    .map(([{inst}]) => inst)
    .do((inst) => inst.prevChannel())
    .publish();

export let InstChannelChange = Rx.Observable
    .merge(SetInstChannelNext, SetInstChannelPrev);

SetInstChannelNext.connect();
SetInstChannelPrev.connect();