import Rx from 'rxjs';
import death from 'death';

let onDeath = new Promise((resolve) => death(resolve));
export let Death = Rx.Observable.fromPromise(onDeath);