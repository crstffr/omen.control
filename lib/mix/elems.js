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

export let MixElemsObj = {
    all: [],
    btn: [],
    knob: [],
    fade: [],
    topKnob: [],
    midKnob: [],
    botKnob: [],
    topBtn: [],
    botBtn: [],
    vertArrow: [],
    horzArrow: [],
    mod: []
};

MixDevice.subscribe((device) => {
    let e = device.elems;
    MixElemsObj.all = MixElems = Object.keys(e).map(k => e[k]);
    MixElemsObj.btn = MixBtnElems = MixElems.filter(elem => elem.btn);
    MixElemsObj.knob = MixKnobElems = MixElems.filter(elem => elem.knob);
    MixElemsObj.fade = MixFadeElems = MixElems.filter(elem => elem.fade);
    MixElemsObj.topKnob = MixTopKnobElems = MixKnobElems.filter(elem => elem.row == 1);
    MixElemsObj.midKnob = MixMidKnobElems = MixKnobElems.filter(elem => elem.row == 2);
    MixElemsObj.botKnob = MixBotKnobElems = MixKnobElems.filter(elem => elem.row == 3);
    MixElemsObj.topBtn = MixTopBtnElems = MixBtnElems.filter(elem => elem.row == 5);
    MixElemsObj.botBtn = MixBotBtnElems = MixBtnElems.filter(elem => elem.row == 6);
    MixElemsObj.vertArrow = MixVertArrowElems = MixBtnElems.filter(elem => elem.row == 7);
    MixElemsObj.horzArrow = MixHorzArrowElems = MixBtnElems.filter(elem => elem.row == 8);
    MixElemsObj.mod = MixModifierElems = MixBtnElems.filter(elem => elem.row == 9);
});