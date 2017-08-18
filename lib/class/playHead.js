import Rx from 'rxjs';
import NanoTimer from 'nanotimer';

class PlaybackHead {

    pos;
    state;
    timer;
    emitter;
    observable;

    bpm = 128;  // beats per minutes
    spb = 4;    // steps per beat

    constructor () {

        this.pos = 0;
        this.state = 'stopped';
        this.timer = new NanoTimer();
        this.observable = Rx.Observable.create(e => this.emitter = e).publish();
        this.observable.connect();
    }

    play() {
        let spm = this.bpm * this.spb;  // steps per minute
        let mspm = spm * 8;             // maximum steps per minute
        let sps = 60 / mspm;            // seconds per step
        let usps = sps * 1000000;       // microseconds per step
        this.timer.setInterval(this.inc.bind(this), '', Math.round(usps) + 'u');
        this.state = 'playing';
    }

    pause() {
        this.timer.clearInterval();
        this.state = 'paused';
    }

    stop() {
        this.pause();
        this.pos = 0;
        this.state = 'stopped';
    }

    toggle() {
        switch(this.state) {
            case 'stopped':
                this.play();
                break;
            case 'paused':
                this.play();
                break;
            case 'playing':
                this.stop();
                break;
        }
    }

    inc() {
        this.emitter.next(++this.pos);
    }

}

export let PlayHead = new PlaybackHead();