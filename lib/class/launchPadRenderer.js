import Rx from 'rxjs';

export class LaunchPadRenderer {

    constructor (Device, Mods, Mod, Trigger, Color, RenderFn) {

        let Show = Device
            .flatMap((device) => Mods.map((mods) => ([mods, device])))
            .filter(([mods]) => mods.has(Mod))
            .map(([mods, device]) => device);

        let Update = Device
            .flatMap(device => Trigger.map(() => device));

        this.Render = Rx.Observable
            .merge(Show, Update)
            .subscribe((device) => {
                device.renderBytes(RenderFn(), Color);
            });

        this.Complete = Mods.filter((mods) => !mods.size);

    }

}