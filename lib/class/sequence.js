import {Page} from './page';
import {Step} from './step';

export class Sequence {

    constructor (i) {

        this.i = i;
        this.page = 1;

        this.steps = [];
        this.pages = [];

        Array(512).fill().forEach((v, i) => {
            this.steps[++i] = new Step(i);
        });

        Array(8).fill().forEach((v, i ) => {
            this.pages[++i] = new Page(i,
                this.steps.filter(step => step.page === i)
            );
        });

    }

    getStep(i) {
        return this.steps[i];
    }

    getPage(i = this.page) {
        return this.pages[i];
    }

    hasSteps() {
        return this.steps.filter(step => step.active).length > -1;
    }

    resetAllPages() {
        this.pages.forEach(page => page.reset());
    }

    clearPage(page) {
        this.pages[page].clearSteps();
    }

    moveSelectedSteps(dist) {

        let steps = this.steps.filter(step => step.selected);

        if (dist > 0) {
            for (let i = steps.length; i-- > 0;) {
                let old = steps[i];
                this.copyStepFrom(old, old.i + dist);
            }
        } else {
            for (let i = 0, l = steps.length; i < l; i++) {
                let old = steps[i];
                this.copyStepFrom(old, old.i + dist);
            }
        }
    }

    copyStepFrom(fromStep, toI) {
        this.steps
            .filter(step => step.i === toI)
            .forEach(newStep => newStep.copyFrom(fromStep));
        fromStep.reset();
    }

}

