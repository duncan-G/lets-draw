import { fromJS } from 'immutable';
import { LOGIN_ERROR, RESOLVE_LOGIN_ERROR } from './constants';

const initalState = fromJS({
  loginError: false
});

const loginReducer = (state = initalState, action) => {
  switch (action.type) {
    case LOGIN_ERROR:
      return state.set('loginError', action.loginError);
    case RESOLVE_LOGIN_ERROR:
      return state.set('loginError', false);
    default:
      return state;
  }
};

export default loginReducer;
