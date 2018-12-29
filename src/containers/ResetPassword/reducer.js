import { fromJS } from 'immutable';
import * as types from './constants';

const initalState = fromJS({
  resetPasswordError: false,
  resetTokenSent: false,
  resetTokenError: false,
  changePasswordError: false,
  email: false
});

const resetPasswordReducer = (state = initalState, action) => {
  switch (action.type) {
    case types.RESET_PASSWORD_ERROR:
      return state.set('resetPasswordError', action.resetPasswordError);
    case types.RESOLVE_RESET_PASSWORD_ERROR:
      return state.set('resetPasswordError', false);
    case types.RESET_TOKEN_SENT:
      return state.set('resetTokenSent', action.email);
    case types.RESET_TOKEN_ERROR:
      return state.set('resetTokenError', action.resetTokenError)
    case types.CHANGE_PASSWORD_ERROR:
      return state.set('changePasswordError', action.changePasswordError)
    case types.RESET_TOKEN_VALID:
      return state.set('email', action.email)
    case types.UNSUBSCRIBE_STATE_CHANGES:
      return state
        .set('resetTokenSent', false)
        .set('resetPasswordError', false);
    default:
      return state;
  }
};

export default resetPasswordReducer;
