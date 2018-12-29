import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { compose } from 'redux';

import withTransition from '../Wrappers/withTransition';
import withBackground from '../Wrappers/withBackground';
import Wrapper from '../../components/Wrapper';

import injectReducer from '../../utils/injectReducer';
import reducer from './reducer';

import ResetToken from './ResetToken';
import ChangePassword from './ChangePassword';

import './ResetPassword.css';

const ResetPassword = props => {
  const path = props.match.path;
  return (
    <Switch>
      <Route exact path={path} component={ResetToken} />
      <Route exact path={`${path}/:resetToken`} component={ChangePassword} />
    </Switch>
  );
};

const withReducer = injectReducer({ key: 'password', reducer });

const withWrapper = withBackground(Wrapper('/images/march.jpg'));

export default compose(
  withWrapper,
  withTransition,
  withReducer
)(ResetPassword);
