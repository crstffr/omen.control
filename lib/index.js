import {AssignedDeviceReadyStream} from './device/assign';

AssignedDeviceReadyStream.subscribe((device) => {
    console.log('ready', device.name);
});

/*
import {SeqKeyPressStream} from './device/midi';
import {PlayKeyPressStream} from './device/midi';

SeqKeyPressStream.subscribe((key) => {
    console.log('SEQ:', key.i, key.xy, key.pos);
});

PlayKeyPressStream.subscribe((key) => {
    console.log('PLAY:', key.i, key.xy, key.pos);
});
*/