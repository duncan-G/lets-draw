import React from 'react';
import PropTypes from 'prop-types';
import hoistNonReactStatics from 'hoist-non-react-statics';
import invariant from 'invariant';
import { isEmpty, isFunction, isString } from 'lodash';

import validateStore from './validateStore';
import createReducer from '../createReducer';

export default ({key, reducer}) => WrappedComponent => {
  class ReducerInjector extends React.Component {
    static WrappedComponent = WrappedComponent;

    static contextTypes = {
      store: PropTypes.object.isRequired
    };

    static dispalyName = `withReducer(${WrappedComponent.displayName ||
      WrappedComponent.name ||
      'Component'})`;

    injectReducer = getInjector(this.context.store);

    componentWillMount() {
      this.injectReducer(key, reducer);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return hoistNonReactStatics(ReducerInjector, WrappedComponent);
};

const getInjector = store => {
  /* Ensure store has the correct format before injection*/
  validateStore(store);

  return reducerInjectorFactory(store);
};

const reducerInjectorFactory = store => {
  return function injector(key, reducer) {
    invariant(
      isString(key) && !isEmpty(key) && isFunction(reducer),
      '(app/utils...) injectReducer: Expected `reducer` to be a reducer function. Got ' +
        typeof reducer
    );

    /* Check if reducer exists */
    if (
      Reflect.has(store.injectedReducers, key) &&
      store.injectedReducers[key] === reducer
    ) {
      return;
    }

    /* Add new reducer and replace old reducer*/
    store.injectedReducers[key] = reducer;
    store.replaceReducer(createReducer(store.injectedReducers));
  };
};
