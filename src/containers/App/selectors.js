import { createSelector } from 'reselect';

export const selectGlobal = state => state.get('global');

export const makeSelectCurrentUser = () =>
  createSelector(
    selectGlobal,
    globalState => {
      return globalState.get('currentUser');
    }
  );

export const makeSelectAppLoading = () =>
  createSelector(
    selectGlobal,
    globalState => {
      return globalState.get('appLoading');
    }
  );

export const makeSelectAppError = () =>
  createSelector(
    selectGlobal,
    globalState => {
      return globalState.get('appError');
    }
  );

export const makeSelectAppMessage = () =>
  createSelector(
    selectGlobal,
    globalState => {
      return globalState.get('appMessage');
    }
  );
