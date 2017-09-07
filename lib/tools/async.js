export function sequentialAsync (asyncOperations) {
    const asyncOp = asyncOperations.shift();
    return asyncOp ? asyncOp().then(() => sequentialAsync(asyncOperations)) : Promise.resolve();
}