import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import ResetForm from './ResetForm';
import { resetPassword, unsubscribeStateChanges } from './actions';
import { makeSelectResetError, makeSelectResetToken } from './selectors';

import './ResetPassword.css';

const ResetTokenSent = props => {
  return (
    <React.Fragment>
      <h4> Your password reset email has been sent!</h4>
      <p>
        We have sent a password reselt email to <b>{props.email}</b>{' '}-
      </p>
      <p> Please check your inbox. </p>
    </React.Fragment>
  );
};

const ResetTokenPage = props => {
  return (
    <React.Fragment>
      <h3 className="auth-title">Reset Password</h3>
      <ResetForm
        id="reset-form"
        resetPassword={props.resetPassword}
        resetError={props.resetError}
      />
      <div className="auth-alt-option">
        <Link to="/login">Go back to login</Link>
      </div>
    </React.Fragment>
  );
};

class ResetToken extends React.Component {

  componentWillUnmount() {
    this.props.unsubscribeStateChanges();
  }

  render() {
    return (
      <div className="auth-page">
        <div className="auth-form-wrapper">
          <div className="auth-logo">
            <img src="/images/logo.svg" alt="/images/logo.svg" />
          </div>
          {this.props.resetTokenSent ? (
            <ResetTokenSent email={this.props.resetTokenSent} />
          ) : (
            <ResetTokenPage {...this.props} />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = () =>
  createStructuredSelector({
    resetError: makeSelectResetError(),
    resetTokenSent: makeSelectResetToken()
  });

const mapDispatchToProps = dispatch => ({
  resetPassword: data => dispatch(resetPassword(data)),
  unsubscribeStateChanges: () => dispatch(unsubscribeStateChanges())
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);


export default compose(
  withConnect
)(ResetToken);
