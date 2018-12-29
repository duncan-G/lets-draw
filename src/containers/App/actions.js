import * as types from './constants';

// User
export const addUser = currentUser => ({
  type: types.ADD_USER,
  currentUser
});
export const removeCurrentUser = () => ({
  type: types.REMOVE_CURRENT_USER
});

// Loading
export const resourceLoading = () => ({
  type: types.APP_RESOURCE_LOADING
});
export const resourceLoadingComplete = () => ({
  type: types.APP_RESOURCE_LOADING_COMPLETE
});

// Error
export const appError = appError => ({
  type: types.APP_ERROR,
  appError
});
export const resolveAppError = () => ({
  type: types.RESOLVE_APP_ERROR
});

// Message
export const appMessage = appMessage => ({
  type: types.APP_MESSAGE,
  appMessage
});
export const resolveAppMessage = () => ({
  type: types.RESOLVE_APP_MESSAGE
});
