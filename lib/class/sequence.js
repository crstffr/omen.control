import {Page} from './page';
import {Step} from './step';

export class Sequence {

    constructor (i) {

        this.i = i;
        this.page = 1;
        this.start = 1;
        this.end = 16;

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

    clearAllSteps() {
        this.pages.forEach(page => page.reset());
    }

    clearPage(page) {
        this.pages[page].clearSteps();
    }

    pageRepeatNext() {
        this.getPage().nextRepeat();
    }

    pageRepeatPrev() {
        this.getPage().prevRepeat();
    }

}