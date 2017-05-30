import Rx from 'rxjs';

export class LaunchCtrlModifer {

    constructor (device, elems, key, name, color) {

        this.name = name;
        this.color = color;

        this.elem = () => elems.filter(e => e.col === key)[0];

        let KeyReady = Rx.Observable.merge(device)
            .flatMap(() => Rx.Observable.from([this.elem()]));

        let KeyPress = KeyReady
            .flatMap(key => Rx.Observable.fromEvent(key, 'press'));

        let KeyRelease = KeyReady
            .flatMap(key => Rx.Observable.fromEvent(key, 'release'));

        this.Activate = KeyPress
            .map(() => state => [name, true]);

        this.Deactivate = KeyRelease
            .map(() => state => [name, false]);

    }

    init() {

        this.State = Rx.Observable
            .merge(this.Activate, this.Deactivate)
            .scan((state, changeFn) => changeFn(state), [this.name, false]);

        this.State.subscribe(([name, bool]) => {
            (bool) ? this.elem().api.light(this.color) : this.elem().api.dark();
        });

        return this.State;
    }
}