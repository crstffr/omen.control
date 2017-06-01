import Rx from 'rxjs';
import {NoteDevice} from './device';
import {PadColors} from '../colors';
import {NoteElemsObj} from './elems';
import {CURRENT_INST, SelectedInst} from '../inst/inst';
import {InstrumentState, ModeChange} from '../inst/inst';
import {Redraw as SeqRedraw} from '../inst/sequence';

import './mods';

let r = PadColors.red.low;
let a = PadColors.amber.low;
let g = PadColors.green.full;
let layouts = ['keyboard', 'chord', 'arp', 'drum'];

let inst = () => CURRENT_INST;

let NoteRedraw = Rx.Observable
    .merge(ModeChange, InstrumentState.delay(1));

NoteRedraw
    .subscribe(() => {

        let ins = inst();
        let li = layouts.indexOf(ins.layout.mode);

        let ModeBtns = NoteElemsObj.top
            .map(elem => [elem, elem.val - 1]);
        
        ModeBtns
            .filter(([,i]) => i === li)
            .forEach(([elem]) => elem.api.light(g));

        ModeBtns
            .filter(([,i]) => i !== li)
            .forEach(([elem]) => elem.api.dark());

});
