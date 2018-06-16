import { isPlainObject } from "./utils/is-plain-object";

/**
 * Implement a predictable state container (inspired by Redux):
 *
 * 1. The should be created by a `createStore` factory (use Crockford's Object creation pattern: https://www.youtube.com/watch?v=PSGEjv3Tqo0)
 * 2. The store object returned should provide `dispatch(action)`, `subscribe(listener)` and `getState` methods
 * 3. Reducers must always be functions!
 * 4. Actions must always be plain objects!
 * 5. A store can have more than one subscriber
 * 6. Ensures immutability of listeners is guaranteed during a dispatch cycle
 * 7. Allows nested dispatch
 * 8. Does not leak listeners
 * 9. Does not allow dispatch(), getState(), subscribe(), unsubscribe() from within a reducer
 * 13. Recovers from errors
 * 14. Throws if action type is missin or undefined and not if falsy
 */
export function createStore(reducer, state) {
	if (typeof reducer !== 'function') {
	    throwError('no function');
	}

	const listeners = [];

	const dispatch = (action) => {
        if (isPlainObject(action) === false) {
            throwError('no plain')
        } else if (typeof action.type === 'undefined') {
            throwError('no action')
        }
      
		state = reducer(state, action);
		for (let k in listeners) {
			if (listeners[k] !== undefined && listeners[k].unsubscribed) {
				listeners[k] = undefined; 
            }
		}
		let currListeners = listeners.filter(x => x !== undefined);
		currListeners.map(x => x.fn.bind(undefined)());
	};

	const subscribe = (fn) => {
		const element = {fn, unsubscribed: false };
		listeners.push(element);
		return () => element.unsubscribed = true;
	};
    
    const throwError = (errorText) => {
        throw new Error(erroText);    
    }

	const getState = () => state;

	return {dispatch, subscribe, getState};
}


