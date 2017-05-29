import {Instrument} from '../class/instrument';

export let Instruments = {};

Array(8).fill().forEach((v, i) => {
    i++; Instruments[i] = new Instrument(i);
});