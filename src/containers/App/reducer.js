import { fromJS } from 'immutable';
import * as types from './constants';

const initalState = fromJS({
  appLoading: false, // Application level loading indicator
  appError: false, // Application level errors
  appMessage: false, // Application level messages
  currentUser: false
});

const appReducer = (state = initalState, action) => {
  switch (action.type) {
    case types.APP_RESOURCE_LOADING:
      return state.set('appLoading', true);
    case types.APP_RESOURCE_LOADING_COMPLETE:
      return state.set('appLoading', false);
    case types.ADD_USER:
      return state.set('currentUser', action.currentUser);
    case types.REMOVE_CURRENT_USER:
      return state.set('currentUser', false);
    case types.APP_ERROR:
      return state.set('appError', action.appError);
    case types.RESOLVE_APP_ERROR:
      return state.set('appError', false);
    case types.APP_MESSAGE:
      return state.set('appMessage', action.appMessage);
    case types.RESOLVE_APP_MESSAGE:
      return state.set('appMessage', false);
    default:
      return state;
  }
};

export default appReducer;
