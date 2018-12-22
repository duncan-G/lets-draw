import { combineReducers } from 'redux-immutable';
import { connectRouter } from 'connected-react-router/immutable';

import history from './utils/history';
import globalReducer from './containers/App/reducer';

export default function createReducer(injectedReducers = {}) {
  const rootReducer =  combineReducers({
    router: connectRouter(history),
    global: globalReducer,
    ...injectedReducers
  });

  return rootReducer
}
