
export class Step {

    constructor (i) {
        this.i = i;
        this.tiedto = 0;
        this.active = false;
        this.selected = false;
        this.notes = new Set();
        this.page = Math.ceil(i/64);
        this.pagei = i - ((this.page - 1) * 64);
    }

    copyFrom(step) {
        step.notes.forEach(note => this.notes.add(note));
        this.tiedto = (step.tiedto) ? this.i + (step.tiedto - step.i) : 0;
        return this;
    }

    selectToggle() {
        this.selected = !this.selected;
        return this.selected;
    }

    select() {
        this.selected = true;
        return this;
    }

    deselect() {
        this.selected = false;
        return this;
    }

    toggle() {
        this.deselect();
        this.active = !this.active;
        return this.active;
    }

    activate() {
        this.active = true;
        return this;
    }

    deactivate() {
        this.active = false;
        return this;
    }

    reset() {
        this.tiedto = 0;
        this.active = false;
        this.selected = false;
        this.notes.clear();
        return this;
    }

}