import { createStore, applyMiddleware, compose } from 'redux';
import { fromJS } from 'immutable';
import { routerMiddleware } from 'connected-react-router/immutable';
import thunkMiddleware from 'redux-thunk';

import createReducer from './createReducer';


export default function configureStore(initialState = {}, history) {
  const middlewares = [thunkMiddleware, routerMiddleware(history)];
  const enhancers = [applyMiddleware(...middlewares)];

  /* eslint-disable no-underscore-dangle, indent */
  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose;
  /* eslint-enable */

  const store = createStore(
    createReducer(),
    fromJS(initialState),
    composeEnhancers(...enhancers)
  );

  // Extensions
  store.injectedReducers = {}; // Reducer registry

  return store;
}
