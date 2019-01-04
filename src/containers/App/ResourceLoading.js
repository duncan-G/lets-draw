import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { createStructuredSelector } from 'reselect';

import { makeSelectAppLoading } from './selectors';
import { connect } from 'react-redux';

/**
 * Display a progress bar when fetching or posting data
 */
const ResourceLoading = props => {
  if (props.appLoading) {
    return <LinearProgress style={{ zIndex: 100000 }} />;
  }
  return null;
};

const mapStateToProps = state =>
  createStructuredSelector({
    appLoading: makeSelectAppLoading()
  });

export default connect(mapStateToProps)(ResourceLoading);
