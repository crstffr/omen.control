import Rx from 'rxjs';
import tonal from 'tonal';
import {inst} from '../inst/inst';
import {Font} from '../tools/font';
import {PadColors} from '../colors';
import {NoteDevice} from './device';
import {NoteElemsObj} from './elems';
import {PlayActions} from './actions';
import {NOTE_MODS, NoteMods} from './mods';
import {Redraw as SeqRedraw} from '../inst/sequence';
import {InstrumentState, ModeChange, Cyclers} from '../inst/inst';
import {LaunchPadRenderer} from '../class/launchPadRenderer';

import './mods';
import './play';

let PREV_MODE = '';
let m = NoteMods;
let d = NoteDevice;
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

let ShowScale = new LaunchPadRenderer(d, m, 'scale', Cyclers.scale.change, a.low, () => {
    console.log('show scale', inst().getScale());
    return Font.get('?');
});

let ShowKey = new LaunchPadRenderer(d, m, 'key', Cyclers.key.change, a.low, () => {
    let char = ['key-', inst().getKey()].join('');
    console.log('show', char);
    return Font.get(char);
});

let NoteRedraw = Rx.Observable
    .merge(
        InstrumentState.delay(1),
        PlayActions.keyboard,
        ShowScale.Complete,
        ShowKey.Complete,
        ModeChange)
    .subscribe(() => {

        console.log('redraw');

        let ins = inst();
        let mode = ins.layout.mode;
        let li = layouts.indexOf(mode);
        let reset = mode !== PREV_MODE;
        PREV_MODE = mode;

        let ModeBtns = NoteElemsObj.top
            .filter(btn => btn.val < 6)
            .map(btn => [btn, btn.val - 1]);

        ModeBtns
            .filter(([,i]) => i === li)
            .forEach(([btn]) => btn.api.light(g.full));

        ModeBtns
            .filter(([,i]) => i !== li)
            .forEach(([btn]) => btn.api.dark());

        let NoteBtns = NoteElemsObj.grid
            .filter(() => !NOTE_MODS.size)
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
                RootBtns.forEach(([btn]) => btn.api.light(a.low));
                NotRootBtns.forEach(([btn]) => btn.api.dark());
                Playing.forEach(([btn]) => btn.api.light(a.full));
                break;
        }

});
