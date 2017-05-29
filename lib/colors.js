import MidiLaunchpad from 'midi-launchpad';

export let LaunchPadColors = {
    off: 0,
    red: {
        low: 1,
        medium:2,
        high:3
    },
    yellow: {
        low: 17,
        medium:34,
        high:54
    },
    amber: {
        low: 45,
        medium:46,
        high:23
    },
    green: {
        low: 16,
        medium:32,
        high:48
    }
};

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
