import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MessageIcon from '@material-ui/icons/Message';

import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { makeSelectAppMessage } from './selectors';
import { resolveAppMessage } from './actions';

class MessageSnackBar extends React.PureComponent {
  handleClose(...args) {
    this.props.resolveAppError();
  }

  render() {
    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          open={!!this.props.appMessage}
          autoHideDuration={6000}
          onClose={this.props.resolveAppMessage}
        >
          <SnackbarContent
            message={
              <span className="snackbar-message">
                <MessageIcon className="snackbar-icon" />
                {this.props.appMessage}
              </span>
            }
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                onClick={this.props.resolveAppMessage}
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
    appMessage: makeSelectAppMessage()
  });

const mapDistpatchToProps = dispatch => ({
  resolveAppMessage: () => dispatch(resolveAppMessage())
});

export default connect(
  mapStateToProps,
  mapDistpatchToProps
)(MessageSnackBar);
