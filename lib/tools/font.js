
export let Font = new Map();

Font.set('∞', [
    [ '0', '0', '0', '0', '0', '0', '0', '0' ],
    [ '0', '0', '0', '0', '0', '0', '0', '0' ],
    [ '0', '1', '1', '1', '0', '1', '1', '0' ],
    [ '1', '0', '0', '0', '1', '0', '0', '1' ],
    [ '1', '0', '0', '1', '0', '0', '0', '1' ],
    [ '0', '1', '1', '0', '1', '1', '1', '0' ],
    [ '0', '0', '0', '0', '0', '0', '0', '0' ],
    [ '0', '0', '0', '0', '0', '0', '0', '0' ]
]);

Font.set(-2, [
    [ '0', '0', '0', '0', '0', '0', '0', '0' ],
    [ '0', '0', '0', '0', '0', '1', '1', '0' ],
    [ '0', '0', '0', '0', '1', '0', '0', '1' ],
    [ '0', '0', '0', '0', '0', '0', '0', '1' ],
    [ '0', '1', '1', '1', '0', '1', '1', '0' ],
    [ '0', '0', '0', '0', '1', '0', '0', '0' ],
    [ '0', '0', '0', '0', '1', '1', '1', '1' ],
    [ '0', '0', '0', '0', '0', '0', '0', '0' ]
]);

Font.set(-1, [
    [ '0', '0', '0', '0', '0', '0', '0', '0' ],
    [ '0', '0', '0', '0', '0', '0', '1', '0' ],
    [ '0', '0', '0', '0', '0', '1', '1', '0' ],
    [ '0', '0', '0', '0', '0', '0', '1', '0' ],
    [ '0', '1', '1', '1', '0', '0', '1', '0' ],
    [ '0', '0', '0', '0', '0', '0', '1', '0' ],
    [ '0', '0', '0', '0', '0', '0', '1', '0' ],
    [ '0', '0', '0', '0', '0', '0', '0', '0' ]
]);

Font.set(0.125, [
    [ '0', '1', '0', '0', '0', '0', '0', '0' ],
    [ '0', '1', '0', '0', '1', '0', '0', '0' ],
    [ '0', '1', '0', '1', '0', '0', '0', '0' ],
    [ '0', '1', '0', '1', '0', '1', '1', '1' ],
    [ '0', '1', '0', '1', '0', '1', '0', '1' ],
    [ '0', '0', '0', '1', '0', '1', '1', '1' ],
    [ '0', '0', '1', '0', '0', '1', '0', '1' ],
    [ '0', '0', '0', '0', '0', '1', '1', '1' ]
]);

Font.set(0.25, [
    [ '0', '1', '0', '0', '0', '0', '0', '0' ],
    [ '0', '1', '0', '0', '1', '0', '0', '0' ],
    [ '0', '1', '0', '1', '0', '0', '0', '0' ],
    [ '0', '1', '0', '1', '0', '1', '0', '1' ],
    [ '0', '1', '0', '1', '0', '1', '0', '1' ],
    [ '0', '0', '0', '1', '0', '1', '1', '1' ],
    [ '0', '0', '1', '0', '0', '0', '0', '1' ],
    [ '0', '0', '0', '0', '0', '0', '0', '1' ]
]);

Font.set(0.5, [
    [ '0', '1', '0', '0', '0', '0', '0', '0' ],
    [ '0', '1', '0', '0', '1', '0', '0', '0' ],
    [ '0', '1', '0', '1', '0', '0', '0', '0' ],
    [ '0', '1', '0', '1', '0', '1', '1', '1' ],
    [ '0', '1', '0', '1', '0', '0', '0', '1' ],
    [ '0', '0', '0', '1', '0', '0', '1', '0' ],
    [ '0', '0', '1', '0', '0', '1', '0', '0' ],
    [ '0', '0', '0', '0', '0', '1', '1', '1' ]
]);

Font.set(0, [
    [ '0', '0', '0', '0', '0', '0', '0', '0' ],
    [ '0', '0', '0', '1', '1', '0', '0', '0' ],
    [ '0', '0', '1', '0', '0', '1', '0', '0' ],
    [ '0', '0', '1', '0', '0', '1', '0', '0' ],
    [ '0', '0', '1', '0', '0', '1', '0', '0' ],
    [ '0', '0', '1', '0', '0', '1', '0', '0' ],
    [ '0', '0', '0', '1', '1', '0', '0', '0' ],
    [ '0', '0', '0', '0', '0', '0', '0', '0' ]
]);

Font.set(1, [
    [ '0', '0', '0', '0', '0', '0', '0', '0' ],
    [ '0', '0', '0', '0', '1', '0', '0', '0' ],
    [ '0', '0', '0', '1', '1', '0', '0', '0' ],
    [ '0', '0', '0', '0', '1', '0', '0', '0' ],
    [ '0', '0', '0', '0', '1', '0', '0', '0' ],
    [ '0', '0', '0', '0', '1', '0', '0', '0' ],
    [ '0', '0', '0', '0', '1', '0', '0', '0' ],
    [ '0', '0', '0', '0', '0', '0', '0', '0' ] ]
);

Font.set(2, [
    [ '0', '0', '0', '0', '0', '0', '0', '0' ],
    [ '0', '0', '0', '1', '1', '0', '0', '0' ],
    [ '0', '0', '1', '0', '0', '1', '0', '0' ],
    [ '0', '0', '0', '0', '0', '1', '0', '0' ],
    [ '0', '0', '0', '1', '1', '0', '0', '0' ],
    [ '0', '0', '1', '0', '0', '0', '0', '0' ],
    [ '0', '0', '1', '1', '1', '1', '0', '0' ],
    [ '0', '0', '0', '0', '0', '0', '0', '0' ]
]);

Font.set(3, [
    [ '0', '0', '0', '0', '0', '0', '0', '0' ],
    [ '0', '0', '0', '1', '1', '0', '0', '0' ],
    [ '0', '0', '1', '0', '0', '1', '0', '0' ],
    [ '0', '0', '0', '0', '1', '0', '0', '0' ],
    [ '0', '0', '0', '0', '0', '1', '0', '0' ],
    [ '0', '0', '1', '0', '0', '1', '0', '0' ],
    [ '0', '0', '0', '1', '1', '0', '0', '0' ],
    [ '0', '0', '0', '0', '0', '0', '0', '0' ]
]);

Font.set(4, [
    [ '0', '0', '0', '0', '0', '0', '0', '0' ],
    [ '0', '0', '1', '0', '0', '1', '0', '0' ],
    [ '0', '0', '1', '0', '0', '1', '0', '0' ],
    [ '0', '0', '1', '0', '0', '1', '0', '0' ],
    [ '0', '0', '1', '1', '1', '1', '0', '0' ],
    [ '0', '0', '0', '0', '0', '1', '0', '0' ],
    [ '0', '0', '0', '0', '0', '1', '0', '0' ],
    [ '0', '0', '0', '0', '0', '0', '0', '0' ]
]);

Font.set(5, [
    [ '0', '0', '0', '0', '0', '0', '0', '0' ],
    [ '0', '0', '1', '1', '1', '1', '0', '0' ],
    [ '0', '0', '1', '0', '0', '0', '0', '0' ],
    [ '0', '0', '1', '1', '1', '0', '0', '0' ],
    [ '0', '0', '0', '0', '0', '1', '0', '0' ],
    [ '0', '0', '1', '0', '0', '1', '0', '0' ],
    [ '0', '0', '0', '1', '1', '0', '0', '0' ],
    [ '0', '0', '0', '0', '0', '0', '0', '0' ]
]);

Font.set(6, [
    [ '0', '0', '0', '0', '0', '0', '0', '0' ],
    [ '0', '0', '0', '1', '1', '0', '0', '0' ],
    [ '0', '0', '1', '0', '0', '0', '0', '0' ],
    [ '0', '0', '1', '1', '1', '0', '0', '0' ],
    [ '0', '0', '1', '0', '0', '1', '0', '0' ],
    [ '0', '0', '1', '0', '0', '1', '0', '0' ],
    [ '0', '0', '0', '1', '1', '0', '0', '0' ],
    [ '0', '0', '0', '0', '0', '0', '0', '0' ]
]);

Font.set(7, [
    [ '0', '0', '0', '0', '0', '0', '0', '0' ],
    [ '0', '0', '1', '1', '1', '1', '0', '0' ],
    [ '0', '0', '0', '0', '0', '1', '0', '0' ],
    [ '0', '0', '0', '0', '1', '0', '0', '0' ],
    [ '0', '0', '0', '1', '0', '0', '0', '0' ],
    [ '0', '0', '0', '1', '0', '0', '0', '0' ],
    [ '0', '0', '0', '1', '0', '0', '0', '0' ],
    [ '0', '0', '0', '0', '0', '0', '0', '0' ]
]);

Font.set(8, [
    [ '0', '0', '0', '0', '0', '0', '0', '0' ],
    [ '0', '0', '1', '1', '1', '1', '0', '0' ],
    [ '0', '0', '1', '0', '0', '1', '0', '0' ],
    [ '0', '0', '1', '1', '1', '1', '0', '0' ],
    [ '0', '0', '1', '0', '0', '1', '0', '0' ],
    [ '0', '0', '1', '0', '0', '1', '0', '0' ],
    [ '0', '0', '1', '1', '1', '1', '0', '0' ],
    [ '0', '0', '0', '0', '0', '0', '0', '0' ]
]);

Font.set(9, [
    [ '0', '0', '0', '0', '0', '0', '0', '0' ],
    [ '0', '0', '1', '1', '1', '1', '0', '0' ],
    [ '0', '0', '1', '0', '0', '1', '0', '0' ],
    [ '0', '0', '1', '0', '0', '1', '0', '0' ],
    [ '0', '0', '1', '1', '1', '1', '0', '0' ],
    [ '0', '0', '0', '0', '0', '1', '0', '0' ],
    [ '0', '0', '0', '0', '0', '1', '0', '0' ],
    [ '0', '0', '0', '0', '0', '0', '0', '0' ]
]);

Font.set(10, [
    [ '0', '0', '0', '0', '0', '0', '0', '0' ],
    [ '0', '0', '1', '0', '1', '1', '1', '0' ],
    [ '0', '1', '1', '0', '1', '0', '1', '0' ],
    [ '0', '0', '1', '0', '1', '0', '1', '0' ],
    [ '0', '0', '1', '0', '1', '0', '1', '0' ],
    [ '0', '0', '1', '0', '1', '0', '1', '0' ],
    [ '0', '0', '1', '0', '1', '1', '1', '0' ],
    [ '0', '0', '0', '0', '0', '0', '0', '0' ]
]);

Font.set(11, [
    [ '0', '0', '0', '0', '0', '0', '0', '0' ],
    [ '0', '0', '1', '0', '0', '1', '0', '0' ],
    [ '0', '1', '1', '0', '1', '1', '0', '0' ],
    [ '0', '0', '1', '0', '0', '1', '0', '0' ],
    [ '0', '0', '1', '0', '0', '1', '0', '0' ],
    [ '0', '0', '1', '0', '0', '1', '0', '0' ],
    [ '0', '0', '1', '0', '0', '1', '0', '0' ],
    [ '0', '0', '0', '0', '0', '0', '0', '0' ]
]);

Font.set(12, [
    [ '0', '0', '0', '0', '0', '0', '0', '0' ],
    [ '0', '0', '1', '0', '1', '1', '1', '0' ],
    [ '0', '1', '1', '0', '0', '0', '1', '0' ],
    [ '0', '0', '1', '0', '0', '0', '1', '0' ],
    [ '0', '0', '1', '0', '0', '1', '0', '0' ],
    [ '0', '0', '1', '0', '1', '0', '0', '0' ],
    [ '0', '0', '1', '0', '1', '1', '1', '0' ],
    [ '0', '0', '0', '0', '0', '0', '0', '0' ]
]);

Font.set(13, [
    [ '0', '0', '0', '0', '0', '0', '0', '0' ],
    [ '0', '0', '1', '0', '1', '1', '1', '0' ],
    [ '0', '1', '1', '0', '0', '0', '1', '0' ],
    [ '0', '0', '1', '0', '0', '1', '1', '0' ],
    [ '0', '0', '1', '0', '0', '0', '1', '0' ],
    [ '0', '0', '1', '0', '0', '0', '1', '0' ],
    [ '0', '0', '1', '0', '1', '1', '1', '0' ],
    [ '0', '0', '0', '0', '0', '0', '0', '0' ]
]);

Font.set(14, [
    [ '0', '0', '0', '0', '0', '0', '0', '0' ],
    [ '0', '0', '1', '0', '1', '0', '1', '0' ],
    [ '0', '1', '1', '0', '1', '0', '1', '0' ],
    [ '0', '0', '1', '0', '1', '0', '1', '0' ],
    [ '0', '0', '1', '0', '1', '1', '1', '0' ],
    [ '0', '0', '1', '0', '0', '0', '1', '0' ],
    [ '0', '0', '1', '0', '0', '0', '1', '0' ],
    [ '0', '0', '0', '0', '0', '0', '0', '0' ]
]);

Font.set(15, [
    [ '0', '0', '0', '0', '0', '0', '0', '0' ],
    [ '0', '0', '1', '0', '1', '1', '1', '0' ],
    [ '0', '1', '1', '0', '1', '0', '0', '0' ],
    [ '0', '0', '1', '0', '1', '1', '1', '0' ],
    [ '0', '0', '1', '0', '0', '0', '1', '0' ],
    [ '0', '0', '1', '0', '1', '0', '1', '0' ],
    [ '0', '0', '1', '0', '1', '1', '1', '0' ],
    [ '0', '0', '0', '0', '0', '0', '0', '0' ]
]);

Font.set(16, [
    [ '0', '0', '0', '0', '0', '0', '0', '0' ],
    [ '0', '0', '1', '0', '1', '1', '1', '0' ],
    [ '0', '1', '1', '0', '1', '0', '0', '0' ],
    [ '0', '0', '1', '0', '1', '1', '1', '0' ],
    [ '0', '0', '1', '0', '1', '0', '1', '0' ],
    [ '0', '0', '1', '0', '1', '0', '1', '0' ],
    [ '0', '0', '1', '0', '1', '1', '1', '0' ],
    [ '0', '0', '0', '0', '0', '0', '0', '0' ]
]);

Font.set('B', [
    [ '0', '0', '0', '0', '0', '0', '0', '0' ],
    [ '0', '0', '1', '1', '1', '0', '0', '0' ],
    [ '0', '0', '1', '0', '0', '1', '0', '0' ],
    [ '0', '0', '1', '1', '1', '0', '0', '0' ],
    [ '0', '0', '1', '0', '0', '1', '0', '0' ],
    [ '0', '0', '1', '0', '0', '1', '0', '0' ],
    [ '0', '0', '1', '1', '1', '0', '0', '0' ],
    [ '0', '0', '0', '0', '0', '0', '0', '0' ]
]);

Font.set('F', [
    [ '0', '0', '0', '0', '0', '0', '0', '0' ],
    [ '0', '0', '1', '1', '1', '1', '0', '0' ],
    [ '0', '0', '1', '0', '0', '0', '0', '0' ],
    [ '0', '0', '1', '1', '1', '0', '0', '0' ],
    [ '0', '0', '1', '0', '0', '0', '0', '0' ],
    [ '0', '0', '1', '0', '0', '0', '0', '0' ],
    [ '0', '0', '1', '0', '0', '0', '0', '0' ],
    [ '0', '0', '0', '0', '0', '0', '0', '0' ]
]);

Font.set('N', [
    [ '0', '0', '0', '0', '0', '0', '0', '0' ],
    [ '0', '1', '0', '0', '0', '0', '1', '0' ],
    [ '0', '1', '1', '0', '0', '0', '1', '0' ],
    [ '0', '1', '0', '1', '0', '0', '1', '0' ],
    [ '0', '1', '0', '0', '1', '0', '1', '0' ],
    [ '0', '1', '0', '0', '0', '1', '1', '0' ],
    [ '0', '1', '0', '0', '0', '0', '1', '0' ],
    [ '0', '0', '0', '0', '0', '0', '0', '0' ]
]);

Font.set('R', [
    [ '0', '0', '0', '0', '0', '0', '0', '0' ],
    [ '0', '0', '1', '1', '1', '1', '0', '0' ],
    [ '0', '0', '1', '0', '0', '1', '0', '0' ],
    [ '0', '0', '1', '1', '1', '1', '0', '0' ],
    [ '0', '0', '1', '1', '0', '0', '0', '0' ],
    [ '0', '0', '1', '0', '1', '0', '0', '0' ],
    [ '0', '0', '1', '0', '0', '1', '0', '0' ],
    [ '0', '0', '0', '0', '0', '0', '0', '0' ]
]);

Font.set('S', [
    [ '0', '0', '0', '0', '0', '0', '0', '0' ],
    [ '0', '0', '0', '1', '1', '0', '0', '0' ],
    [ '0', '0', '1', '0', '0', '1', '0', '0' ],
    [ '0', '0', '1', '1', '0', '0', '0', '0' ],
    [ '0', '0', '0', '0', '1', '1', '0', '0' ],
    [ '0', '0', '1', '0', '0', '1', '0', '0' ],
    [ '0', '0', '0', '1', '1', '0', '0', '0' ],
    [ '0', '0', '0', '0', '0', '0', '0', '0' ]
]);


Font.set('?', [
    [ '0', '0', '0', '0', '0', '0', '0', '0' ],
    [ '0', '0', '1', '1', '1', '1', '0', '0' ],
    [ '0', '0', '0', '0', '0', '1', '0', '0' ],
    [ '0', '0', '0', '1', '1', '1', '0', '0' ],
    [ '0', '0', '0', '1', '0', '0', '0', '0' ],
    [ '0', '0', '0', '0', '0', '0', '0', '0' ],
    [ '0', '0', '0', '1', '0', '0', '0', '0' ],
    [ '0', '0', '0', '0', '0', '0', '0', '0' ]
]);


Font.set('key-C', [
    [ '0', '0', '0', '0', '0', '0', '0', '0' ],
    [ '0', '0', '0', '1', '1', '0', '0', '0' ],
    [ '0', '0', '1', '0', '0', '1', '0', '0' ],
    [ '0', '0', '1', '0', '0', '0', '0', '0' ],
    [ '0', '0', '1', '0', '0', '0', '0', '0' ],
    [ '0', '0', '1', '0', '0', '1', '0', '0' ],
    [ '0', '0', '0', '1', '1', '0', '0', '0' ],
    [ '0', '0', '0', '0', '0', '0', '0', '0' ]
]);

Font.set('key-Db', [
    [ '0', '0', '0', '0', '0', '0', '0', '0' ],
    [ '1', '1', '1', '0', '0', '0', '0', '0' ],
    [ '1', '0', '0', '1', '0', '1', '0', '0' ],
    [ '1', '0', '0', '1', '0', '1', '0', '0' ],
    [ '1', '0', '0', '1', '0', '1', '1', '1' ],
    [ '1', '0', '0', '1', '0', '1', '0', '1' ],
    [ '1', '1', '1', '0', '0', '1', '1', '1' ],
    [ '0', '0', '0', '0', '0', '0', '0', '0' ]
]);

Font.set('key-D', [
    [ '0', '0', '0', '0', '0', '0', '0', '0' ],
    [ '0', '0', '1', '1', '1', '0', '0', '0' ],
    [ '0', '0', '1', '0', '0', '1', '0', '0' ],
    [ '0', '0', '1', '0', '0', '1', '0', '0' ],
    [ '0', '0', '1', '0', '0', '1', '0', '0' ],
    [ '0', '0', '1', '0', '0', '1', '0', '0' ],
    [ '0', '0', '1', '1', '1', '0', '0', '0' ],
    [ '0', '0', '0', '0', '0', '0', '0', '0' ]
]);

Font.set('key-Eb', [
    [ '0', '0', '0', '0', '0', '0', '0', '0' ],
    [ '1', '1', '1', '1', '0', '0', '0', '0' ],
    [ '1', '0', '0', '0', '0', '1', '0', '0' ],
    [ '1', '1', '1', '0', '0', '1', '0', '0' ],
    [ '1', '0', '0', '0', '0', '1', '1', '1' ],
    [ '1', '0', '0', '0', '0', '1', '0', '1' ],
    [ '1', '1', '1', '1', '0', '1', '1', '1' ],
    [ '0', '0', '0', '0', '0', '0', '0', '0' ]
]);

Font.set('key-E', [
    [ '0', '0', '0', '0', '0', '0', '0', '0' ],
    [ '0', '0', '1', '1', '1', '1', '0', '0' ],
    [ '0', '0', '1', '0', '0', '0', '0', '0' ],
    [ '0', '0', '1', '1', '1', '0', '0', '0' ],
    [ '0', '0', '1', '0', '0', '0', '0', '0' ],
    [ '0', '0', '1', '0', '0', '0', '0', '0' ],
    [ '0', '0', '1', '1', '1', '1', '0', '0' ],
    [ '0', '0', '0', '0', '0', '0', '0', '0' ]
]);

Font.set('key-F', [
    [ '0', '0', '0', '0', '0', '0', '0', '0' ],
    [ '0', '0', '1', '1', '1', '1', '0', '0' ],
    [ '0', '0', '1', '0', '0', '0', '0', '0' ],
    [ '0', '0', '1', '1', '1', '0', '0', '0' ],
    [ '0', '0', '1', '0', '0', '0', '0', '0' ],
    [ '0', '0', '1', '0', '0', '0', '0', '0' ],
    [ '0', '0', '1', '0', '0', '0', '0', '0' ],
    [ '0', '0', '0', '0', '0', '0', '0', '0' ]
]);

Font.set('key-Gb', [
    [ '0', '0', '0', '0', '0', '0', '0', '0' ],
    [ '1', '1', '1', '1', '0', '0', '0', '0' ],
    [ '1', '0', '0', '0', '0', '1', '0', '0' ],
    [ '1', '0', '1', '1', '0', '1', '0', '0' ],
    [ '1', '0', '0', '1', '0', '1', '1', '1' ],
    [ '1', '0', '0', '1', '0', '1', '0', '1' ],
    [ '1', '1', '1', '1', '0', '1', '1', '1' ],
    [ '0', '0', '0', '0', '0', '0', '0', '0' ]
]);

Font.set('key-G', [
    [ '0', '0', '0', '0', '0', '0', '0', '0' ],
    [ '0', '0', '1', '1', '1', '1', '0', '0' ],
    [ '0', '0', '1', '0', '0', '0', '0', '0' ],
    [ '0', '0', '1', '0', '1', '1', '0', '0' ],
    [ '0', '0', '1', '0', '0', '1', '0', '0' ],
    [ '0', '0', '1', '0', '0', '1', '0', '0' ],
    [ '0', '0', '1', '1', '1', '1', '0', '0' ],
    [ '0', '0', '0', '0', '0', '0', '0', '0' ]
]);

Font.set('key-Ab', [
    [ '0', '0', '0', '0', '0', '0', '0', '0' ],
    [ '0', '1', '1', '0', '0', '0', '0', '0' ],
    [ '1', '0', '0', '1', '0', '1', '0', '0' ],
    [ '1', '1', '1', '1', '0', '1', '0', '0' ],
    [ '1', '0', '0', '1', '0', '1', '1', '1' ],
    [ '1', '0', '0', '1', '0', '1', '0', '1' ],
    [ '1', '0', '0', '1', '0', '1', '1', '1' ],
    [ '0', '0', '0', '0', '0', '0', '0', '0' ]
]);

Font.set('key-A', [
    [ '0', '0', '0', '0', '0', '0', '0', '0' ],
    [ '0', '0', '0', '1', '1', '0', '0', '0' ],
    [ '0', '0', '1', '0', '0', '1', '0', '0' ],
    [ '0', '0', '1', '1', '1', '1', '0', '0' ],
    [ '0', '0', '1', '0', '0', '1', '0', '0' ],
    [ '0', '0', '1', '0', '0', '1', '0', '0' ],
    [ '0', '0', '1', '0', '0', '1', '0', '0' ],
    [ '0', '0', '0', '0', '0', '0', '0', '0' ]
]);

Font.set('key-Bb', [
    [ '0', '0', '0', '0', '0', '0', '0', '0' ],
    [ '1', '1', '1', '0', '0', '0', '0', '0' ],
    [ '1', '0', '0', '1', '0', '1', '0', '0' ],
    [ '1', '1', '1', '0', '0', '1', '0', '0' ],
    [ '1', '0', '0', '1', '0', '1', '1', '1' ],
    [ '1', '0', '0', '1', '0', '1', '0', '1' ],
    [ '1', '1', '1', '0', '0', '1', '1', '1' ],
    [ '0', '0', '0', '0', '0', '0', '0', '0' ]
]);

Font.set('key-B', [
    [ '0', '0', '0', '0', '0', '0', '0', '0' ],
    [ '0', '0', '1', '1', '1', '0', '0', '0' ],
    [ '0', '0', '1', '0', '0', '1', '0', '0' ],
    [ '0', '0', '1', '1', '1', '0', '0', '0' ],
    [ '0', '0', '1', '0', '0', '1', '0', '0' ],
    [ '0', '0', '1', '0', '0', '1', '0', '0' ],
    [ '0', '0', '1', '1', '1', '0', '0', '0' ],
    [ '0', '0', '0', '0', '0', '0', '0', '0' ]
]);

Font.set('scale-chromatic', [
    [ '0', '0', '0', '0', '0', '0', '0', '0' ],
    [ '0', '1', '1', '1', '0', '0', '0', '0' ],
    [ '1', '0', '0', '0', '0', '1', '0', '0' ],
    [ '1', '0', '0', '0', '0', '1', '0', '0' ],
    [ '1', '0', '0', '0', '0', '1', '1', '1' ],
    [ '1', '0', '0', '0', '0', '1', '0', '1' ],
    [ '0', '1', '1', '1', '0', '1', '0', '1' ],
    [ '0', '0', '0', '0', '0', '0', '0', '0' ]
]);

/*
Font.set('scale-lydian', [
    [ '0', '0', '0', '0', '0', '0', '0', '0' ],
    [ '1', '0', '0', '0', '0', '0', '0', '0' ],
    [ '1', '0', '0', '0', '1', '0', '0', '1' ],
    [ '1', '0', '0', '0', '1', '0', '0', '1' ],
    [ '1', '0', '0', '0', '0', '1', '1', '0' ],
    [ '1', '0', '0', '0', '0', '1', '0', '0' ],
    [ '1', '1', '1', '0', '1', '0', '0', '0' ],
    [ '0', '0', '0', '0', '0', '0', '0', '0' ]
]);
*/

Font.set('scale-major', [
    [ '0', '0', '0', '0', '0', '0', '0', '0' ],
    [ '1', '0', '0', '0', '1', '0', '0', '0' ],
    [ '1', '1', '0', '1', '1', '0', '1', '0' ],
    [ '1', '0', '1', '0', '1', '0', '0', '1' ],
    [ '1', '0', '0', '0', '1', '1', '1', '1' ],
    [ '1', '0', '0', '0', '1', '1', '0', '1' ],
    [ '1', '0', '0', '0', '1', '1', '1', '1' ],
    [ '0', '0', '0', '0', '0', '0', '0', '0' ]
]);

Font.set('scale-harmonic minor', [
    [ '0', '0', '0', '0', '0', '0', '0', '0' ],
    [ '1', '0', '0', '0', '1', '0', '0', '0' ],
    [ '1', '1', '0', '1', '1', '0', '1', '0' ],
    [ '1', '0', '1', '0', '1', '0', '0', '0' ],
    [ '1', '0', '0', '0', '1', '0', '1', '0' ],
    [ '1', '0', '0', '0', '1', '0', '1', '0' ],
    [ '1', '0', '0', '0', '1', '0', '1', '0' ],
    [ '0', '0', '0', '0', '0', '0', '0', '0' ]
]);

Font.set('scale-dorian', [
    [ '0', '0', '0', '0', '0', '0', '0', '0' ],
    [ '1', '1', '1', '0', '0', '0', '0', '0' ],
    [ '1', '0', '0', '1', '0', '0', '0', '0' ],
    [ '1', '0', '0', '1', '0', '0', '0', '0' ],
    [ '1', '0', '0', '1', '0', '1', '1', '1' ],
    [ '1', '0', '0', '1', '0', '1', '0', '1' ],
    [ '1', '1', '1', '0', '0', '1', '1', '1' ],
    [ '0', '0', '0', '0', '0', '0', '0', '0' ]
]);

Font.set('scale-aeolian', [
    [ '0', '0', '0', '0', '0', '0', '0', '0' ],
    [ '0', '1', '1', '0', '0', '0', '0', '0' ],
    [ '1', '0', '0', '1', '0', '0', '1', '0' ],
    [ '1', '1', '1', '1', '0', '1', '0', '1' ],
    [ '1', '0', '0', '1', '0', '1', '1', '1' ],
    [ '1', '0', '0', '1', '0', '1', '0', '0' ],
    [ '1', '0', '0', '1', '0', '1', '1', '1' ],
    [ '0', '0', '0', '0', '0', '0', '0', '0' ]
]);

Font.set('scale-phrygian', [
    [ '0', '0', '0', '0', '0', '0', '0', '0' ],
    [ '1', '1', '1', '0', '0', '0', '0', '0' ],
    [ '1', '0', '0', '1', '0', '1', '0', '0' ],
    [ '1', '1', '1', '0', '0', '1', '0', '0' ],
    [ '1', '0', '0', '0', '0', '1', '1', '1' ],
    [ '1', '0', '0', '0', '0', '1', '0', '1' ],
    [ '1', '0', '0', '0', '0', '1', '0', '1' ],
    [ '0', '0', '0', '0', '0', '0', '0', '0' ]
]);

Font.set('scale-locrian', [
    [ '0', '0', '0', '0', '0', '0', '0', '0' ],
    [ '1', '0', '0', '0', '0', '0', '0', '0' ],
    [ '1', '0', '0', '0', '0', '0', '0', '0' ],
    [ '1', '0', '0', '0', '0', '0', '0', '0' ],
    [ '1', '0', '0', '0', '0', '1', '1', '1' ],
    [ '1', '0', '0', '0', '0', '1', '0', '1' ],
    [ '1', '1', '1', '1', '0', '1', '1', '1' ],
    [ '0', '0', '0', '0', '0', '0', '0', '0' ]
]);

Font.set('scale-augmented', [
    [ '0', '0', '0', '0', '0', '0', '0', '0' ],
    [ '0', '1', '1', '0', '0', '0', '0', '0' ],
    [ '1', '0', '0', '1', '0', '0', '0', '0' ],
    [ '1', '1', '1', '1', '0', '0', '0', '0' ],
    [ '1', '0', '0', '1', '0', '1', '0', '1' ],
    [ '1', '0', '0', '1', '0', '1', '0', '1' ],
    [ '1', '0', '0', '1', '0', '1', '1', '1' ],
    [ '0', '0', '0', '0', '0', '0', '0', '0' ]
]);

Font.set('scale-diminished', [
    [ '0', '0', '0', '0', '0', '0', '0', '0' ],
    [ '1', '1', '1', '0', '0', '0', '0', '0' ],
    [ '1', '0', '0', '1', '0', '0', '1', '0' ],
    [ '1', '0', '0', '1', '0', '0', '0', '0' ],
    [ '1', '0', '0', '1', '0', '0', '1', '0' ],
    [ '1', '0', '0', '1', '0', '0', '1', '0' ],
    [ '1', '1', '1', '0', '0', '0', '1', '0' ],
    [ '0', '0', '0', '0', '0', '0', '0', '0' ]
]);

Font.set('scale-pelog', [
    [ '0', '0', '0', '0', '0', '0', '0', '0' ],
    [ '1', '1', '1', '0', '0', '0', '0', '0' ],
    [ '1', '0', '1', '0', '0', '1', '0', '0' ],
    [ '1', '1', '1', '0', '1', '0', '1', '0' ],
    [ '1', '0', '0', '0', '1', '1', '1', '0' ],
    [ '1', '0', '0', '0', '1', '0', '0', '0' ],
    [ '1', '0', '0', '0', '0', '1', '1', '0' ],
    [ '0', '0', '0', '0', '0', '0', '0', '0' ]
]);

Font.set('scale-neopolitan', [
    [ '0', '0', '0', '0', '0', '0', '0', '0' ],
    [ '1', '0', '0', '1', '0', '0', '0', '0' ],
    [ '1', '0', '0', '1', '0', '0', '1', '0' ],
    [ '1', '1', '0', '1', '0', '1', '0', '1' ],
    [ '1', '0', '1', '1', '0', '1', '1', '1' ],
    [ '1', '0', '0', '1', '0', '1', '0', '0' ],
    [ '1', '0', '0', '1', '0', '0', '1', '1' ],
    [ '0', '0', '0', '0', '0', '0', '0', '0' ]
]);

Font.set('scale-persian', [
    [ '0', '0', '0', '0', '0', '0', '0', '0' ],
    [ '1', '1', '1', '0', '0', '0', '0', '0' ],
    [ '1', '0', '0', '1', '0', '0', '0', '0' ],
    [ '1', '1', '1', '0', '0', '0', '1', '0' ],
    [ '1', '0', '0', '0', '0', '1', '0', '1' ],
    [ '1', '0', '0', '0', '0', '1', '0', '0' ],
    [ '1', '0', '0', '0', '0', '1', '0', '0' ],
    [ '0', '0', '0', '0', '0', '0', '0', '0' ]
]);

Font.set('scale-egyptian', [
    [ '0', '0', '0', '0', '0', '0', '0', '0' ],
    [ '1', '1', '1', '1', '0', '0', '0', '0' ],
    [ '1', '0', '0', '0', '0', '1', '1', '1' ],
    [ '1', '1', '1', '0', '0', '1', '0', '1' ],
    [ '1', '0', '0', '0', '0', '1', '1', '1' ],
    [ '1', '0', '0', '0', '0', '0', '0', '1' ],
    [ '1', '1', '1', '1', '0', '1', '1', '1' ],
    [ '0', '0', '0', '0', '0', '0', '0', '0' ]
]);

Font.set('scale-oriental', [
    [ '0', '0', '0', '0', '0', '0', '0', '0' ],
    [ '0', '1', '1', '0', '0', '0', '0', '0' ],
    [ '1', '0', '0', '1', '0', '0', '0', '0' ],
    [ '1', '0', '0', '1', '0', '0', '1', '0' ],
    [ '1', '0', '0', '1', '0', '1', '0', '1' ],
    [ '1', '0', '0', '1', '0', '1', '0', '0' ],
    [ '0', '1', '1', '0', '0', '1', '0', '0' ],
    [ '0', '0', '0', '0', '0', '0', '0', '0' ]
]);

Font.set('scale-bebop', [
    [ '0', '0', '0', '0', '0', '0', '0', '0' ],
    [ '1', '1', '1', '0', '0', '0', '0', '0' ],
    [ '1', '0', '0', '1', '0', '0', '1', '0' ],
    [ '1', '1', '1', '0', '0', '1', '0', '1' ],
    [ '1', '0', '0', '1', '0', '1', '1', '1' ],
    [ '1', '0', '0', '1', '0', '1', '0', '0' ],
    [ '1', '1', '1', '0', '0', '0', '1', '1' ],
    [ '0', '0', '0', '0', '0', '0', '0', '0' ]
]);

Font.set('scale-enigmatic', [
    [ '0', '0', '0', '0', '0', '0', '0', '0' ],
    [ '1', '1', '1', '0', '0', '0', '0', '0' ],
    [ '1', '0', '0', '0', '0', '0', '0', '1' ],
    [ '1', '1', '0', '0', '0', '0', '0', '0' ],
    [ '1', '0', '0', '1', '1', '1', '0', '1' ],
    [ '1', '0', '0', '1', '0', '1', '0', '1' ],
    [ '1', '1', '1', '1', '0', '1', '0', '1' ],
    [ '0', '0', '0', '0', '0', '0', '0', '0' ]
]);

Font.set('scale-melodic minor', [
    [ '0', '0', '0', '0', '0', '0', '0', '0' ],
    [ '1', '0', '0', '0', '1', '0', '0', '0' ],
    [ '1', '1', '0', '1', '1', '0', '1', '0' ],
    [ '1', '0', '1', '0', '1', '1', '0', '1' ],
    [ '1', '0', '0', '0', '1', '1', '1', '0' ],
    [ '1', '0', '0', '0', '1', '1', '0', '0' ],
    [ '1', '0', '0', '0', '1', '0', '1', '1' ],
    [ '0', '0', '0', '0', '0', '0', '0', '0' ]
]);

Font.set('scale-major pentatonic', [
    [ '0', '0', '0', '1', '1', '0', '0', '0' ],
    [ '0', '0', '0', '1', '1', '0', '0', '0' ],
    [ '1', '1', '1', '1', '1', '1', '1', '1' ],
    [ '0', '1', '1', '1', '1', '1', '1', '0' ],
    [ '0', '0', '1', '1', '1', '1', '0', '0' ],
    [ '0', '1', '1', '0', '0', '1', '1', '0' ],
    [ '1', '1', '0', '0', '0', '0', '1', '1' ],
    [ '0', '0', '0', '0', '0', '0', '0', '0' ]
]);

Font.set('scale-minor pentatonic', [
    [ '0', '0', '0', '0', '0', '0', '0', '0' ],
    [ '0', '0', '0', '1', '1', '0', '0', '0' ],
    [ '0', '1', '1', '1', '1', '1', '1', '0' ],
    [ '0', '0', '0', '1', '1', '0', '0', '0' ],
    [ '0', '0', '1', '1', '1', '1', '0', '0' ],
    [ '0', '1', '0', '0', '0', '0', '1', '0' ],
    [ '0', '0', '0', '0', '0', '0', '0', '0' ],
    [ '0', '0', '0', '0', '0', '0', '0', '0' ]
]);

Font.set('scale-major blues', [
    [ '0', '0', '0', '0', '0', '0', '0', '0' ],
    [ '1', '1', '1', '0', '0', '0', '0', '0' ],
    [ '1', '0', '0', '1', '0', '1', '0', '0' ],
    [ '1', '1', '1', '0', '0', '1', '0', '0' ],
    [ '1', '0', '0', '1', '0', '1', '0', '0' ],
    [ '1', '0', '0', '1', '0', '1', '0', '0' ],
    [ '1', '1', '1', '0', '0', '1', '1', '1' ],
    [ '0', '0', '0', '0', '0', '0', '0', '0' ]
]);

/*
Font.set('', [

]);
*/
