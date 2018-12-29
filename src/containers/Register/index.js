import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import withTransition from '../Wrappers/withTransition';
import withBackground from '../Wrappers/withBackground';
import Wrapper from '../../components/Wrapper';

import injectReducer from '../../utils/injectReducer';
import reducer from './reducer';

import RegisterForm from './Form';
import { registerUser } from './actions';
import { makeSelectRegistrationError } from './selectors';

const Register = props => {
  return (
    <div className="auth-page">
      <div className="auth-form-wrapper">
        <div className="auth-logo">
          <img src="/images/logo.svg" alt="/images/logo.svg" />
        </div>
        <h3 className="auth-title">Register</h3>
        <RegisterForm
          id="register-form"
          register={props.registerUser}
          registrationError={props.registrationerror}
        />
        <div className="auth-alt-option">
          <span>Already have an account?</span>
          <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = () =>
  createStructuredSelector({
    registrationError: makeSelectRegistrationError()
  });

const mapDispatchToProps = dispatch => ({
  registerUser: data => dispatch(registerUser(data))
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'register', reducer });

const withWrapper = withBackground(Wrapper('/images/march.jpg'));

export default compose(
  withWrapper,
  withTransition,
  withReducer,
  withConnect
)(Register);
