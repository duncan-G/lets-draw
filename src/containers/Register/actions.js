import history from '../../utils/history';

import { REGISTRATION_ERROR } from './constants';
import {
  addUser,
  appError,
  resourceLoading,
  resourceLoadingComplete
} from '../App/actions';

export const registrationError = registrationError => ({
  type: REGISTRATION_ERROR,
  registrationError
});

/* Thunk creators */
export const registerUser = data => {
  return dispatch => {
    dispatch(resourceLoading());

    fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          dispatch(registrationError(data.error.message));
        } else {
          dispatch(addUser(data));
          history.push('/homepage');
        }
      })
      .catch(error => {
        dispatch(appError(error));
      })
      .finally(() => {
        dispatch(resourceLoadingComplete());
      });
  };
};
