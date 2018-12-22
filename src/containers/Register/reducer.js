import { fromJS } from 'immutable';
import { REGISTRATION_ERROR, RESOLVE_REGISTRATION_ERROR } from './constants';

const initialState = fromJS({
  registrationError: false
});

const registrationReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTRATION_ERROR:
      return state.set('registrationError', action.registrationError);
    case RESOLVE_REGISTRATION_ERROR:
      return state.set('registrationError', false);
    default:
      return state;
  }
};

export default registrationReducer;
