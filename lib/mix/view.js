import {LaunchCtrlColors} from '../colors';
import {MixBotBtnElems} from './elems';
import {MixInstState} from './inst';

MixInstState.subscribe(state => {

    MixBotBtnElems
        .filter(elem => elem.inst === state.inst)
        .forEach(elem => elem.api.light(LaunchCtrlColors.green.low));

    MixBotBtnElems
        .filter(elem => elem.inst !== state.inst)
        .forEach(elem => elem.api.off());

});