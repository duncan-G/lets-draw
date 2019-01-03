import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import AccountCircle from '@material-ui/icons/AccountCircle';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    display: 'flex'
  },
  paper: {
    marginRight: theme.spacing.unit * 2
  }
});

class UserProfileOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null
    };
  }

  handleOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleLogoutOut = () => {
    this.props.logout();
    this.handleClose();
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = !!anchorEl;

    return (
      <div className={classes.root}>
        <div>
          <Button
            aria-owns={open ? 'user-profile-options' : undefined}
            aria-haspopup="true"
            onClick={this.handleOpen}
          >
            <img
              className="profile-logo"
              src="/images/logo.svg"
              alt="/images/logo.svg"
            />
            <Typography className="user" variant="subtitle1">
              {this.props.user}
            </Typography>
            <KeyboardArrowDown style={{ marginLeft: '5px' }} />
          </Button>
          <Popper open={open} anchorEl={anchorEl} transition disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="user-profile-options"
                style={{
                  transformOrigin:
                    placement === 'bottom' ? 'center top' : 'center bottom'
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={this.handleClose}>
                    <MenuList>
                      <MenuItem
                        onClick={this.handleClose}
                        className="profile-option"
                      >
                        <AccountCircle className="profile-icon" />
                        <span>Profile</span>
                      </MenuItem>
                      <MenuItem
                        onClick={this.handleLogoutOut}
                        className="profile-option"
                      >
                        <PowerSettingsNew className="profile-icon" />
                        <span>Logout</span>
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </div>
    );
  }
}

UserProfileOptions.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UserProfileOptions);
