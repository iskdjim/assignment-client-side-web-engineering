/*
 * Implement a pure function "pow". The function should behave the same as
 * Math.pow(n, n) -> Math.pow(2, 2) = 4 but should not use Math.pow(…). Find an
 * elegant and pure functional solution to the problem w/o any side-effects.
 *
 * - Works with positive integers ℤ+!
 * - Throws an error if exponent is invalid
 */
export function pow(a,b) {
    if(b % 1 !== 0 || b < 1) {
        throw "error";
    }
    
    return new Array(b).fill(a).reduce((product, factor) => factor*product);
}

/*
 * Implement a sortBy function that is capable of sorting any field within the
 * set "data.json".
 *
 * - Provides a primer for complex fields
 * - Throws an error if arguments are invalid
 */
export function sortBy(field, primer) { 
    var key = (x) => { return (primer ? primer(x[field]) : x[field]); };
        return function (y,z) {
            return ( (key(y) < key(z)) ? -1 : ((key(y) > key(z)) ? 1 : 0));
        }
}

/*
export function sortBy(type, ...rest) { 
    return (a, b) =>  { return a[type] > b[type] } 
}
*/
