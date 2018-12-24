import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import injectReducer from '../../utils/injectReducer';
import reducer from './reducer';

import withTransition from '../Wrappers/withTransition';
import LoginForm from './Form';
import { loginUser } from './actions';
import { makeSelectLoginError } from './selectors';

import './Login.css';

class Login extends React.Component {
  render() {
    return (
      <div id="login-page" className="auth-page">
        <div className="auth-form-wrapper">
          <div className="auth-logo">
            <img src="/images/logo.svg" alt="/images/logo.svg" />
          </div>
          <h3 className="auth-title">Login</h3>
          <LoginForm
            id="login-form"
            login={this.props.loginUser}
            loginError={this.props.loginError}
          />
          <div className="auth-alt-option">
            <span className="text">Dont have an account?</span>
            <Link to="/register">Register</Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = () =>
  createStructuredSelector({
    loginError: makeSelectLoginError()
  });

const mapDispatchToProps = dispatch => ({
  loginUser: data => dispatch(loginUser(data))
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'login', reducer });

export default compose(
  withTransition,
  withReducer,
  withConnect
)(Login);
