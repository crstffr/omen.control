import Rx from 'rxjs';
import NanoTimer from 'nanotimer';
import {Instruments} from './collection';

class PlaybackClass {

    bpm = 128;  // beats per minutes
    spb = 4;    // steps per beat

    notes = [];
    steps = [];
    timing = 0;
    position = 0;
    state = 'stopped';
    timer = new NanoTimer();

    renderObservable;
    renderEmitter;

    playObservable;
    playEmitter;
    
    positionObservable;
    positionEmitter;

    stopObservable;
    stopEmitter;

    constructor() {

        this.timing = this.calcTiming();

        this.renderObservable = Rx.Observable
            .create(e => this.renderEmitter = e).publish();

        this.playObservable = Rx.Observable
            .create(e => this.playEmitter = e).publish();

        this.positionObservable = Rx.Observable
            .create(e => this.positionEmitter = e).publish();

        this.stopObservable = Rx.Observable
            .create(e => this.stopEmitter = e).publish();

        this.playObservable.connect();
        this.stopObservable.connect();
        this.renderObservable.connect();
        this.positionObservable.connect();

    }

    calcTiming() {
        let spm = this.bpm * this.spb;  // steps per minute
        let mspm = spm * 8;             // maximum steps per minute
        let sps = 60 / mspm;            // seconds per step
        let usps = sps * 1000000;       // microseconds per step
        return Math.round(usps);        // rounded microseconds
    }

    render() {
        this.state = 'rendering';
        this.renderEmitter.next();
        this.notes.length = 0;
        this.steps.length = 0;

        let promises = [];

        return new Promise(resolve => {
            Object.keys(Instruments).forEach((k) => {
                promises.push(Instruments[k].generatePlayback());
            });
            Promise.all(promises).then((data) => {
                data.forEach(([notes, steps]) => {
                    this.notes.push(notes);
                    this.steps.push(steps);
                });
                resolve();
            });
        });
    }
    
    toggle() {
        switch(this.state) {
            case 'playing':
            case 'rendering':
                this.stop();
                break;
            case 'stopped':
                this.play();
                break;
        }
    }

    play() {

        this.render().then(() => {
            if (this.state !== 'rendering') { return; }
            this.state = 'playing';
            this.playEmitter.next();
            this.timer.setInterval(this.inc.bind(this), '', this.timing + 'u');
        });
    }

    stop() {
        this.timer.clearInterval();
        this.state = 'stopped';
        this.position = 0;
        this.stopEmitter.next();
    }

    inc() {

        this.positionEmitter.next(++this.position);

        this.notes.forEach((inst) => {

            let notes = inst[this.position];

            if (notes) {
                notes.forEach((note) => {

                    let timer = new NanoTimer();
                    let timing = Math.round(this.timing * (note.hold - 0.5));
                    let Inst = Instruments[note.inst];
                    Inst.playMidi(note.midi);

                    timer.setTimeout(() => Inst.stopMidi(note.midi), '', timing + 'u');

                });
            }
        });
    }

}

export let InstPlayback = new PlaybackClass();