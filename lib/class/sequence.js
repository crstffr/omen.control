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

    serialize() {
        return {
            i: this.i,
            page: this.page,
            steps: this.steps.map(step => step.serialize()),
            pages: this.pages.map(page => page.serialize())
        }
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

    getSelectedSteps() {
        return this.steps.filter(step => step.selected);
    }

    selectedStepsNotes() {
        let notes = new Set();
        this.getSelectedSteps().forEach(step => {
            step.notes.forEach(note => notes.add(note));
        });
        return notes;
    }

    resetAllPages() {
        this.pages.forEach(page => page.reset());
    }

    clearPage(page) {
        this.pages[page].clearSteps();
    }

    moveSelectedSteps(dist) {
        let steps = this.getSelectedSteps();
        if (dist > 0) {
            for (let i = steps.length; i-- > 0;) {
                let old = steps[i];
                this.moveStepFrom(old, old.i + dist);
            }
        } else {
            for (let i = 0, l = steps.length; i < l; i++) {
                let old = steps[i];
                this.moveStepFrom(old, old.i + dist);
            }
        }
    }

    moveStepFrom(from, i) {
        this.steps
            .filter(step => step.i === i)
            .forEach(newStep => newStep.copyFrom(from).select());
        from.reset();
    }

    copySelectedSteps(dest) {
        let steps = this.getSelectedSteps();
        if (steps.length === 0) { return; }
        let offset = dest.i - steps[0].i;
        steps.forEach(step => this.copyStepFrom(step, step.i + offset));
    }

    copyStepFrom(from, i) {
        this.steps
            .filter(step => step.i === i)
            .forEach(step => step.copyFrom(from));
    }

}

