import {LaunchCtrlColors} from '../colors';
import {InstState} from '../inst/state';
import {MixBotBtnElems} from './elems';

InstState.subscribe(state => {

    MixBotBtnElems
        .filter(elem => elem.inst === state.inst.i)
        .forEach(elem => elem.api.light(LaunchCtrlColors.green.low));

    MixBotBtnElems
        .filter(elem => elem.inst !== state.inst.i)
        .forEach(elem => elem.api.off());

});