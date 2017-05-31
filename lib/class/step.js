
export class Step {

    constructor (i) {
        this.i = i;
        this.notes = {};
        this.active = false;
        this.selected = false;
        this.page = Math.ceil(i/64);
        this.pagei = i - ((this.page - 1) * 64);
    }

    copyFrom(step) {
        this.notes = Object.assign({}, step.notes);
        this.active = step.active;
        return this;
    }

    selectToggle() {
        this.selected = !this.selected;
        return this.selected;
    }

    select() {
        if (!this.active) { return; }
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
        this.active = false;
        this.selected = false;
        let tmp = Object.assign({}, this.notes);
        Object.keys(tmp).forEach((k) => {
            delete this.notes[k];
        });
        return this;
    }

}