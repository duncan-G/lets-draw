import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ErrorIcon from '@material-ui/icons/Error';

import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { makeSelectAppError } from './selectors';
import { resolveAppError } from './actions';

class ErrorSnackBar extends React.PureComponent {
  handleClose(...args) {
    console.log(args);
    this.props.resolveAppError();
  }

  render() {
    return (
      <div>
        <Snackbar
          className="error-snackbar"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          open={!!this.props.appError}
          autoHideDuration={6000}
          onClose={this.props.resolveAppError}
        >
          <SnackbarContent
            className="error-snackbar-content"
            message={
              <span className="error-message">
                <ErrorIcon className="error-icon" />
                {this.props.appError}
              </span>
            }
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                onClick={this.props.resolveAppError}
              >
                <CloseIcon />
              </IconButton>
            ]}
          />
        </Snackbar>
      </div>
    );
  }
}

const mapStateToProps = () =>
  createStructuredSelector({
    appError: makeSelectAppError()
  });

const mapDistpatchToProps = dispatch => ({
  resolveAppError: () => dispatch(resolveAppError())
});

export default connect(
  mapStateToProps,
  mapDistpatchToProps
)(ErrorSnackBar);
