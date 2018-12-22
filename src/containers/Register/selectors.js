import { createSelector } from 'reselect';

export const selectRegistration = state => state.get('register');

export const makeSelectRegistrationError = () =>
  createSelector(
    selectRegistration,
    registrationState => {
      return registrationState.get('registrationError');
    }
  );
