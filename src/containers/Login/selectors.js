import { createSelector } from 'reselect';

export const selectLogin = state => state.get('login');

export const makeSelectLoginError = () =>
  createSelector(
    selectLogin,
    loginState => {
      return loginState.get('loginError');
    }
  );
