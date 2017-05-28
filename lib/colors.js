import MidiLaunchpad from 'midi-launchpad';

export let LaunchPadColors = MidiLaunchpad.colors;

export let LaunchCtrlColors = {
    off: 12,
    red: {
        low: 13,
        full: 15
    },
    amber: {
        low: 87,
        full: 91
    },
    yellow: {
        low: 62,
        full: 62
    },
    green: {
        low: 28,
        full: 60
    }
};

