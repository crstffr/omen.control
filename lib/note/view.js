import Rx from 'rxjs';
import tonal from 'tonal';
import {PadColors} from '../colors';
import {NoteDevice} from './device';
import {NoteElemsObj} from './elems';
import {PlayActions} from './actions';
import {InstrumentState, ModeChange} from '../inst/inst';
import {Redraw as SeqRedraw} from '../inst/sequence';
import {inst} from '../inst/inst';

import './mods';
import './play';

let PREV_MODE = '';

let r = PadColors.red;
let g = PadColors.green;
let a = PadColors.amber;

let layouts = [
    'keyboard',
    'chord',
    'arp',
    'drum',
    'ccs'
];

let NoteRedraw = Rx.Observable
    .merge(
        InstrumentState.delay(1),
        PlayActions.keyboard,
        ModeChange)
    .subscribe(() => {

        let ins = inst();
        let mode = ins.layout.mode;
        let li = layouts.indexOf(mode);
        let reset = mode !== PREV_MODE;
        PREV_MODE = mode;

        let ModeBtns = NoteElemsObj.top
            .map(btn => [btn, btn.val - 1]);

        ModeBtns
            .filter(([,i]) => i === li)
            .forEach(([btn]) => btn.api.light(g.full));

        ModeBtns
            .filter(([,i]) => i !== li)
            .forEach(([btn]) => btn.api.dark());


        let NoteBtns = NoteElemsObj.grid
            .map(btn => [btn, inst().getNote(btn.val - 1)]);

        let RootBtns = NoteBtns
            .filter(([btn, [note]]) => {
                return tonal.note.pc(note) === inst().getKey();
            });

        let NotRootBtns = NoteBtns
            .filter(([btn, [note]]) => {
                return tonal.note.pc(note) !== inst().getKey();
            });

        let Playing = NoteBtns
            .filter(([,[note]]) => inst().playing.has(note));

        if (reset) {
            NoteBtns.forEach(([btn]) => btn.api.dark());
        }

        switch(mode) {
            case 'keyboard':
                RootBtns.forEach(([btn]) => btn.api.light(g.low));
                NotRootBtns.forEach(([btn]) => btn.api.dark());
                Playing.forEach(([btn]) => btn.api.light(g.full));
                break;
        }

});
