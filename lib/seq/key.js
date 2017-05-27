


export let SeqKeyPressStream = DeviceKeyPressStream
    .filter((key) => {
        return key.parent.name === 'seq';
    });

export let SeqGridPressStream = SeqKeyPressStream
    .filter((key) => {
        return key.pos.grid;
    });