import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import ChangePasswordForm from './ChangeForm';
import { changePassword, verifyToken } from './actions';
import {
  makeSelectChangePasswordError,
  makeSelectResetTokenError,
  makeSelectEmail
} from './selectors';

const ChangePasswordWrapper = props => {
  return (
    <div className="auth-page">
      <div className="auth-form-wrapper">
        <div className="auth-logo">
          <img src="/images/logo.svg" alt="/images/logo.svg" />
        </div>
        {props.renderChildren()}
      </div>
    </div>
  );
};

const TokenError = props => {
  return (
    <React.Fragment>
      <h3 className="auth-title">Error</h3>
      <p>{props.error}</p>
      <Link to="/reset-password">Go back to reset</Link>
    </React.Fragment>
  );
};

const ChangepasswordForm = props => {
  return (
    <React.Fragment>
      <h3 className="auth-title">Change Password</h3>
      <ChangePasswordForm
        id="change-password-form"
        email={props.email}
        changePassword={props.changePassword}
        changePasswordError={props.changePasswordError}
      />
    </React.Fragment>
  );
};

class ChangePassword extends React.Component {
  componentDidMount() {
    const resetToken = this.props.match.params.resetToken;
    this.props.verifyToken(resetToken);
    this.setState({ loading: false });
  }

  render() {
    if (this.props.resetTokenError) {
      return (
        <ChangePasswordWrapper
          {...this.props}
          renderChildren={() => (
            <TokenError error={this.props.resetTokenError} />
          )}
        />
      );
    } else if (this.props.email) {
      return (
        <ChangePasswordWrapper
          {...this.props}
          renderChildren={() => (
            <ChangepasswordForm
              email={this.props.email}
              changePassword={this.props.changePassword}
              changePasswordError={this.props.changePasswordError}
            />
          )}
        />
      );
    } else {
      return (
        <ChangePasswordWrapper
          {...this.props}
          renderChildren={() => <h3>Verifying Token ...</h3>}
        />
      );
    }
  }
}

const mapStateToProps = () =>
  createStructuredSelector({
    resetTokenError: makeSelectResetTokenError(),
    changePasswordError: makeSelectChangePasswordError(),
    email: makeSelectEmail()
  });

const mapDispatchToProps = dispatch => ({
  changePassword: data => dispatch(changePassword(data)),
  verifyToken: resetToken => dispatch(verifyToken(resetToken))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePassword);
