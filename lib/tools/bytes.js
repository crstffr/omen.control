export function bytes(set) {

    let matrix = Array(8).fill().map(() => Array(8).fill(0));

    set.forEach(([x, y, active]) => {
        matrix[y][x] = active ? '1' : '0';
    });

    return matrix;

}