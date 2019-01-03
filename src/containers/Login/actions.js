import history from '../../utils/history';

import {
  addUser,
  appError,
  resourceLoading,
  resourceLoadingComplete
} from '../App/actions';
import { LOGIN_ERROR } from './constants';

export const loginError = loginError => ({
  type: LOGIN_ERROR,
  loginError
});

/* Thunk creators */
export const loginUser = data => {
  return dispatch => {
    dispatch(resourceLoading());

    fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(result => {
        if (result.error) {
          dispatch(loginError(result.error.message));
        } else {
          dispatch(addUser(result.data));
          history.push('/');
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
