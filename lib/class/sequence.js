import {Step} from './step';

export class Sequence {

    constructor (i) {

        this.i = i;
        this.page = 1;
        this.start = 1;
        this.end = 16;
        this.steps = [];

        Array(512).fill().forEach((v, i) => {
            this.steps[++i] = new Step(i);
        });
    }

    clearAllSteps() {
        this.steps.forEach(step => step.clear());
    }

    clearPage(page) {
        Array(64).fill().forEach((v, i) => {
            i = (64 * (page - 1)) + i + 1;
            this.steps[i].clear();
        });
    }

}