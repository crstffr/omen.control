import {MixDevice} from './device';

export let MixElems = [];
export let MixKnobElems = [];
export let MixBtnElems = [];
export let MixFadeElems = [];
export let MixTopKnobElems = [];
export let MixMidKnobElems = [];
export let MixBotKnobElems = [];
export let MixVertArrowElems = [];
export let MixHorzArrowElems = [];
export let MixModifierElems = [];
export let MixTopBtnElems = [];
export let MixBotBtnElems = [];

MixDevice.subscribe((device) => {
    let e = device.elems;
    MixElems = Object.keys(e).map(k => e[k]);
    MixBtnElems = MixElems.filter(elem => elem.btn);
    MixKnobElems = MixElems.filter(elem => elem.knob);
    MixFadeElems = MixElems.filter(elem => elem.fade);
    MixTopKnobElems = MixKnobElems.filter(elem => elem.row == 1);
    MixMidKnobElems = MixKnobElems.filter(elem => elem.row == 2);
    MixBotKnobElems = MixKnobElems.filter(elem => elem.row == 3);
    MixTopBtnElems = MixBtnElems.filter(elem => elem.row == 5);
    MixBotBtnElems = MixBtnElems.filter(elem => elem.row == 6);
    MixVertArrowElems = MixBtnElems.filter(elem => elem.row == 7);
    MixHorzArrowElems = MixBtnElems.filter(elem => elem.row == 8);
    MixModifierElems = MixBtnElems.filter(elem => elem.row == 9);
});