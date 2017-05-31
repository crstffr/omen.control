
export const REPEAT = Array(18).fill().map((v, i) => i - 1).filter(v => v !== 0);
export const SPEED = [0.125, 0.25, 0.5, 1, 2, 4, 8];
export const PLAYBACK = ['F', 'R', 'B', '?'];

export class Page {

    constructor(i, steps) {

        this.i = i;
        this.start = 1;
        this.end = 64;
        this.speed = 1;
        this.repeat = 1;
        this.playback = 'F';

        this.steps = steps || [];
        this.cycle = {};

        [
            ['speed', SPEED],
            ['repeat', REPEAT],
            ['playback', PLAYBACK]
        ].forEach(([name, values]) => {
            this.cycle[name] = {
                next: () => { this[name] = _next(values, this[name])},
                prev: () => { this[name] = _prev(values, this[name])}
            }
        });
    }

    reset() {
        this.speed = 1;
        this.repeat = 1;
        this.playback = 'F';
        this.clearSteps();
    }

    hasSteps() {
        return this.steps.filter(step => step.active).length > 0;
    }

    clearSteps() {
        this.steps.forEach(step => step.reset());
    }

    selectActiveSteps() {
        this.steps
            .filter(step => step.active)
            .forEach(step => step.select());
    }

    deselectAllSteps() {
        this.steps.forEach(step => step.deselect());
    }

}

function _next(what, curr) {
    let i = what.indexOf(curr);
    return what[(i === what.length - 1) ? 0 : i + 1];
}

function _prev(what, curr) {
    let i = what.indexOf(curr);
    return what[(i === 0) ? what.length - 1 : i - 1];
}