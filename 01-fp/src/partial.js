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

export function partial(fn) {
  return function recursive(...a) {
    if (a.length === 0) {
      return fn();
    }
    return (...b) => {
      const args = a.concat(b).filter(c => c !== _);
      return (args.length >= fn.length) ? fn(...args) : recursive(...args);
      
    };
  };
}