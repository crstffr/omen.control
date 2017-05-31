
export class Step {

    constructor (i) {
        this.i = i;
        this.notes = {};
        this.active = false;
        this.selected = false;
        this.page = Math.ceil(i/64);
    }

    copyFrom(step) {
        this.notes = Object.assign({}, step.notes);
        this.selected = step.selected;
        this.active = step.active;
    }

    selectToggle() {
        this.selected = !this.selected;
        return this.selected;
    }

    select() {
        if (!this.active) { return; }
        this.selected = true;
    }

    deselect() {
        this.selected = false;
    }

    toggle() {
        this.deselect();
        this.active = !this.active;
        return this.active;
    }

    activate() {
        this.active = true;
    }

    deactivate() {
        this.active = false;
    }

    reset() {
        this.active = false;
        this.selected = false;
        let tmp = Object.assign({}, this.notes);
        Object.keys(tmp).forEach((k) => {
            delete this.notes[k];
        });
    }

}