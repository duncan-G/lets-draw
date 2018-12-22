import { isFunction, conformsTo, isObject } from 'lodash';
import invariant from 'invariant';

export default function validateStore(store) {
  const shape = {
    dispatch: isFunction,
    subscribe: isFunction,
    getState: isFunction,
    replaceReducer: isFunction,
    injectedReducers: isObject,
  };

  invariant(
    conformsTo(store, shape),
    '(app/utils...) injectors: Expected a valid redux store'
  );
}
