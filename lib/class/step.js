
export class Step {

    constructor (i) {
        this.i = i;
        this.notes = {};
        this.active = false;
    }

    toggle() {
        this.active = !this.active;
        return this.active;
    }

    activate() {
        this.active = true;
    }

    deactivate() {
        this.active = false;
    }

    clear() {
        this.deactivate();
        let tmp = Object.assign({}, this.notes);
        Object.keys(tmp).forEach((k) => {
            delete this.notes[k];
        });
    }

}