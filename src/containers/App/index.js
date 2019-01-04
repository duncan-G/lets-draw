import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

import ProtectedRoute from './ProtectedRoute';

import AppContent from '../Content';
import Login from '../Login/Loadable';
import Register from '../Register/Loadable';
import ResetPassword from '../ResetPassword/Loadable';
import ResourceLoading from './ResourceLoading';
import ErrorSnackBar from './ErrorSnackbar';
import MessageSnackBar from './MessageSnackbar';

import './App.css';

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

class App extends Component {
  render() {
    return (
      <AppWrapper>
        <ResourceLoading />
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/reset-password" component={ResetPassword} />
          <ProtectedRoute path="/" component={AppContent} />
        </Switch>
        <ErrorSnackBar />
        <MessageSnackBar />
      </AppWrapper>
    );
  }
}

export default App;
