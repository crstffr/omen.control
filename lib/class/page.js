
export class Page {

    constructor(i, steps) {
        this.i = i;
        this.speed = 1;
        this.repeats = 1;
        this.steps = steps || [];
    }

    hasSteps() {
        return this.steps.filter(step => step.active).length > 0;
    }

    clearSteps() {
        this.steps.forEach(step => step.clear())
    }

}