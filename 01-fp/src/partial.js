/*
 * Implement a partial function. The function should return a variation of
 * the original function that can be invoked partially. Do also implement a
 * placeholder constant that can be used during invocation.
 *
 * - Works with an arbitrary length of arguments
 * - Works with an arbitrary number of placeholder elements!
 * - `partial` is a pure function!
 */
export const _ = undefined;

export function partial(fn, _, ...a) {
    var args = Array.prototype.slice.call(a);
    return function() {
      return fn.apply(this, args.concat(
        Array.prototype.slice.call(a)));
};
}
