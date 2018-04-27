/*
 * Implement a currify function. The function should return a currified
 * variation of the given function.
 *
 * - Works with an arbitrary length of arguments
 * - Works with ...rest if curry is invoked with a second argument "length"
 * - `curry` is a pure function!
 * - Has auto currying after initial call
 */

export function curry(fn, numArgs = fn.length, ...a) { 
  return function c(...a) {
    if (a.length >= numArgs) {
      return fn.apply(fn, a);
    } else {
      return function(...b) {
        return c.apply(fn, a.concat(b));
      }
    }
  };
}

/*
export function curry(fn, numArgs, ...a) {  
  return (...a) => {
    function c(fn, len, ...a){
      console.log(a);
      if (a.length < 1) {    
        return fn();
      }

      console.log(a.length);
      len -= a.length;

      if (len === 0) {
        return fn.apply(fn, a);
      }

      const auto = (...b) => fn.apply(fn, a.concat(b))
          
      return (...b) => c(auto, len, ...b);
    }
    console.log(a);
    return c(fn, numArgs, ...a);
  }
}*/
