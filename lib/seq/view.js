import {LaunchPadColors} from '../colors';
import {SeqPageElems} from './elems';
import {SeqPageState} from './page';
import './mods';

SeqPageState.subscribe((state) => {

    SeqPageElems
        .filter((key) => key.val === state.page)
        .forEach(key => key.api.light(LaunchPadColors.green.low));

    SeqPageElems
        .filter((key) => key.val !== state.page)
        .forEach(key => key.api.light(LaunchPadColors.off));

});