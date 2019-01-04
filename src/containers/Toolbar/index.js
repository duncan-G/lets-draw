import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectCurrentUser } from '../App/selectors';
import { logout } from '../App/actions';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

import UserProfileOptions from './UserProfileOptions';

import './Toolbar.css';

const drawerWidth = 240;
const styles = theme => ({
  root: { display: 'flex' },
  appBar: {
    height: '64px',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  hide: {
    display: 'none'
  },
  title: {
    flexGrow: 1
  }
});

const AppToolbar = props => {
  const { classes } = props;
  return (
    <AppBar
      position="fixed"
      className={classNames(classes.appBar, {
        [classes.appBarShift]: props.open
      })}
      color="default"
    >
      <Toolbar disableGutters={!props.open}>
        <IconButton
          color="inherit"
          aria-label="Open drawer"
          onClick={props.handleDrawerOpen}
          className={classNames(classes.menuButton, {
            [classes.hide]: props.open
          })}
        >
          <MenuIcon />
        </IconButton>

        <Typography
          variant="h6"
          color="inherit"
          noWrap
          className={classes.title}
        >
          Hello World
        </Typography>
        <UserProfileOptions
          user={props.user}
          logout={props.logout}
          className="user-profile"
        />
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = () =>
  createStructuredSelector({
    user: makeSelectCurrentUser()
  });

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AppToolbar));
