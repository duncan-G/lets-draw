import history from '../../utils/history';
import {
  appError,
  resourceLoading,
  resourceLoadingComplete,
  appMessage
} from '../App/actions';
import * as types from './constants';

export const resetPasswordError = resetPasswordError => ({
  type: types.RESET_PASSWORD_ERROR,
  resetPasswordError
});

export const resetTokenSent = email => ({
  type: types.RESET_TOKEN_SENT,
  email
});

export const resetTokenError = resetTokenError => ({
  type: types.RESET_TOKEN_ERROR,
  resetTokenError
});

export const changePasswordError = changePasswordError => ({
  type: types.CHANGE_PASSWORD_ERROR,
  changePasswordError
});

export const resolveChangePasswordError = () => ({
  type: types.RESOLVE_CHANGE_PASSWORD_ERROR
});

export const resetTokenValid = email => ({
  type: types.RESET_TOKEN_VALID,
  email
});

export const unsubscribeStateChanges = () => ({
  type: types.UNSUBSCRIBE_STATE_CHANGES
});

/* Thunk creators */
export const resetPassword = data => {
  return dispatch => {
    dispatch(resourceLoading());

    fetch('/api/auth/reset-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(result => {
        if (result.error) {
          dispatch(resetPasswordError(result.error.message));
        } else {
          dispatch(resetTokenSent(result.data));
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

export const verifyToken = resetToken => {
  return dispatch => {
    dispatch(resourceLoading());

    fetch('/api/auth/verify-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ resetToken })
    })
      .then(response => response.json())
      .then(result => {
        if (result.error) {
          dispatch(resetTokenError(result.error.message));
        } else {
          dispatch(resetTokenValid(result.data));
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

export const changePassword = data => {
  console.log(data);
  return dispatch => {
    dispatch(resolveChangePasswordError());
    dispatch(resourceLoading());

    const url = data.oldPassword
      ? '/api/auth/change-password'
      : '/api/auth/reset-password';

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(result => {
        if (result.error) {
          dispatch(changePasswordError(result.error.message));
        } else {
          dispatch(appMessage('Password succesfully changed'));
          if (data.oldPassword) {
            history.push('/');
          } else {
            history.push('/login');
          }
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
