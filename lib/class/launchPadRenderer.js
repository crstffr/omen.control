import Rx from 'rxjs';
import {Font} from '../tools/font';
import {PadColors} from '../colors';

export class LaunchPadRenderer {

    constructor (Device, Mods, Mod, Trigger, ValueFn) {

        let Show = Device
            .flatMap((device) => Mods.map((mods) => ([mods, device])))
            .filter(([mods]) => mods.has(Mod))
            .map(([mods, device]) => device);

        let Update = Device
            .flatMap(device => Trigger.map(() => device));

        this.Render = Rx.Observable
            .merge(Show, Update)
            .subscribe((device) => {
                device.renderBytes(Font.get(ValueFn()), PadColors.amber.low);
            });

        this.Complete = Mods.filter((mods) => !mods.size);

    }

}