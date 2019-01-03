import * as types from './constants';

/*  Action creators */

export const addUser = currentUser => ({
  type: types.ADD_USER,
  currentUser
});

export const removeCurrentUser = () => ({
  type: types.REMOVE_CURRENT_USER
});

export const resourceLoading = () => ({
  type: types.APP_RESOURCE_LOADING
});

export const resourceLoadingComplete = () => ({
  type: types.APP_RESOURCE_LOADING_COMPLETE
});

export const appError = appError => ({
  type: types.APP_ERROR,
  appError
});

export const resolveAppError = () => ({
  type: types.RESOLVE_APP_ERROR
});

export const appMessage = appMessage => ({
  type: types.APP_MESSAGE,
  appMessage
});

export const resolveAppMessage = () => ({
  type: types.RESOLVE_APP_MESSAGE
});

/* Thunk creators */
export const logout = () => {
  return dispatch => {
    dispatch(resourceLoading());

    fetch('/api/auth/logout')
      .then(response => response.json())
      .then(result => {
        if (result.error) {
          dispatch(appError(result.error.message));
        } else {
          dispatch(removeCurrentUser());
        }
      })
      .catch(error => dispatch(appError(error.message)))
      .finally(() => dispatch(resourceLoadingComplete()));
  };
};
