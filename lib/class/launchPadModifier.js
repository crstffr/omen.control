import Rx from 'rxjs';

export class LaunchPadModifer {

    constructor (device, elems, group, key, name, color) {

        this.name = name;
        this.color = color;

        this.elem = () => elems[group].filter(e => e.val === key)[0];

        let KeyReady = Rx.Observable.merge(device)
            .flatMap(() => Rx.Observable.from([this.elem()]));

        let KeyPress = KeyReady
            .flatMap(key => Rx.Observable.fromEvent(key.api, 'press'));

        let KeyRelease = KeyReady
            .flatMap(key => Rx.Observable.fromEvent(key.api, 'release'));

        this.Activate = KeyPress.map(() => state => ([name, true]));

        this.Deactivate = KeyRelease.map(() => state => ([name, false]));

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