import Rx from 'rxjs';
import {inst} from '../inst/inst';
import {LaunchPadAction} from '../devices/launchpad';
import {LaunchPadPressAction} from '../devices/launchpad';
import {LaunchPadReleaseAction} from '../devices/launchpad';

let Action = LaunchPadAction
    .filter(btn => btn.device.name === 'note');

let Press = Action.filter(btn => btn.pressed);
let Release = Action.filter(btn => !btn.pressed);
let TopPress = Press.filter(btn => btn.pos.top);
let SidePress = Press.filter(btn => btn.pos.side);
let GridPress = Press.filter(btn => btn.pos.grid);
let GridAction = Action.filter(btn => btn.pos.grid);

export let NoteGridArrows = {
    up: GridPress.filter(key => key.xy === '76'),
    down: GridPress.filter(key => key.xy === '77'),
}

let KeyboardPlay = GridAction
    .filter(() => inst().layout.mode === 'keyboard')
    .publish();

let ChordPlay = GridAction
    .filter(() => inst().layout.mode === 'chord')
    .publish();

let ArpPlay = GridAction
    .filter(() => inst().layout.mode === 'arp')
    .publish();

let DrumPlay = GridAction
    .filter(() => inst().layout.mode === 'drum')
    .publish();

export let SelectLayout = {
    keyboard: TopPress.filter(btn => btn.val === 1),
    chord: TopPress.filter(btn => btn.val === 2),
    arp: TopPress.filter(btn => btn.val === 3),
    drum: TopPress.filter(btn => btn.val === 4),
    ccs: TopPress.filter(btn => btn.val === 5),
};

export let NoteActions = {
    keyboard: KeyboardPlay,
    chord: ChordPlay,
    drum: DrumPlay,
    arp: ArpPlay
};

export let PanicAction = SidePress
    .filter(btn => btn.val === 6)
    .publish();

export let RecordAction = SidePress
    .filter(btn => btn.val === 7)
    .publish();

export let PlaybackAction = SidePress
    .filter(btn => btn.val === 8)
    .publish();

PlaybackAction.connect();
RecordAction.connect();
PanicAction.connect();
KeyboardPlay.connect();
ChordPlay.connect();
DrumPlay.connect();
ArpPlay.connect();
