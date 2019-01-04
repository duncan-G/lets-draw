import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from '../../utils/injectReducer';
import reducer from '../ResetPassword/reducer';

import { makeSelectCurrentUser } from '../App/selectors';
import UserCard from './UserCard';
import { changePassword } from '../ResetPassword/actions';
import { makeSelectChangePasswordError } from '../ResetPassword/selectors';
import ChangePasswordForm from './ChangePasswordForm';

const UserProfile = props => {
  return (
    <div className="app-page fixed">
      <div className="aligned">
        <UserCard
          email={props.user}
          renderCardContent={() => (
            <ChangePasswordForm
              email={props.user}
              changePassword={props.changePassword}
              changePasswordError={props.changePasswordError}
            />
          )}
        />
      </div>
    </div>
  );
};

const mapStateToProps = () =>
  createStructuredSelector({
    user: makeSelectCurrentUser(),
    changePasswordError: makeSelectChangePasswordError()
  });

const mapDispatchToProps = (dispatch) => ({
  changePassword: data => dispatch(changePassword(data))
});

const withReducer = injectReducer({ key: 'password', reducer });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withReducer,
  withConnect
)(UserProfile);
