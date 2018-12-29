import { createSelector } from 'reselect';

export const selectPassword = state => state.get('password');

export const makeSelectResetError = () =>
  createSelector(
    selectPassword,
    passwordState => {
      return passwordState.get('resetPasswordError');
    }
  );

export const makeSelectResetToken = () =>
  createSelector(
    selectPassword,
    passwordState => {
      return passwordState.get('resetTokenSent');
    }
  );

export const makeSelectResetTokenError = () =>
  createSelector(
    selectPassword,
    passwordState => {
      return passwordState.get('resetTokenError');
    }
  );

export const makeSelectChangePasswordError = () =>
  createSelector(
    selectPassword,
    passwordState => {
      return passwordState.get('changePasswordError');
    }
  );

export const makeSelectEmail = () =>
  createSelector(
    selectPassword,
    passwordState => {
      return passwordState.get('email');
    }
  );
