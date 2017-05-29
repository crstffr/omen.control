
export class Step {

    constructor (i) {
        this.i = i;
        this.on = false;
        this.notes = {};
    }

    toggle() {
        this.on = !this.on;
        return this.on;
    }

    clear() {
        let tmp = Object.assign({}, this.notes);
        Object.keys(tmp).forEach((k) => {
            delete this.notes[k];
        });
    }

}