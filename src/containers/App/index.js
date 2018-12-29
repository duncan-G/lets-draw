import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

import ProtectedRoute from './ProtectedRoute';

import HomePage from '../HomePage/Loadable';
import Login from '../Login/Loadable';
import Register from '../Register/Loadable';
import ResetPassword from '../ResetPassword/Loadable';
import ResourceLoading from './ResourceLoading';
import ErrorSnackBar from './ErrorSnackbar';

import './App.css';

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

class App extends Component {
  render() {
    return (
      <AppWrapper>
        <ResourceLoading />
        <Switch>
          <ProtectedRoute path="/homepage" component={HomePage} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/reset-password" component={ResetPassword} />
        </Switch>
        <ErrorSnackBar />
      </AppWrapper>
    );
  }
}

export default App;
