export let LAUNCHPAD_ELEMS = {};
export let LAUNCHCONTROL_ELEMS = {};

/**
 * Precalculate the metadata for the LaunchControl elements.
 */
Array(9).fill().map((v, row) => {
    row = row + 1;
    let cols = (row <= 6) ? 8 : (row < 9) ? 2 : 4;
    Array(cols).fill().map((v, col) => {
        col = col + 1;
        let knob = row <= 3;
        let fade = row == 4;
        let key = '' + row + col;
        let btn = !knob && !fade;
        let idx = getIndex(row, col);
        let inst = (row < 7) ? col : null;
        LAUNCHCONTROL_ELEMS[key] = {
            key, row, col, knob, fade, btn, idx, inst
        };
    });
});

/**
 * Precalculate the metadata for the LaunchPad elements.
 */
Array(9).fill().map((k, y) => {
    let top = (y === 8);
    Array(9).fill().map((k, x) => {
        let side = (x === 8);
        let xy = '' + x + y;
        let val = (top) ? x + 1 : (side) ? y + 1 : (8 * y) + x + 1;
        LAUNCHPAD_ELEMS[xy] = {
            x, y, xy, val,
            pos: {
                top,
                side,
                grid: !top && !side
            }
        };
    });
});

/**
 * Figure out the internal numbering system for a given LaunchControl element.
 * Details taken from: https://goo.gl/If5pgM
 */
function getIndex(row, col) {
    switch (row) {
        case 1:
        case 2:
        case 3:
            return (8 * (row - 1)) + col - 1;
            break;
        case 5:
        case 6:
            return (8 * (row - 2)) + col - 1;
            break;
        case 7:
        case 8:
            return ((row - 7) * 2) + 44 + col - 1;
            break;
        case 9:
            return 40 + col - 1;
            break;
    }
}