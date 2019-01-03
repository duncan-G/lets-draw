import React from 'react';
import { NavLink } from 'react-router-dom';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import classNames from 'classnames';

import navigation from './navigation';
import './Navbar.css';

const drawerWidth = 240;

const styles = theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap'
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9 + 1
    }
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  logoContainer: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center'
  },
  logo: {
    width: '50px',
    height: '50px'
  }
});

const NavItem = props => {
  return (
    <NavLink to={props.to} className="nav-item">
      <ListItem button>
        <ListItemIcon>
          <Icon>{props.icon}</Icon>
        </ListItemIcon>
        <ListItemText primary={props.label} />
      </ListItem>
    </NavLink>
  );
};

const SideNav = props => {
  const { classes } = props;

  const iconAction = () =>
    props.variant === 'permanent' ? (
      <IconButton onClick={props.handleDrawerDock}>
        <MenuIcon />
      </IconButton>
    ) : (
      <IconButton onClick={props.handleDrawerClose}>
        <ChevronLeftIcon />
      </IconButton>
    );

  return (
    <React.Fragment>
      <div className={classes.toolbar}>
        <div className={classes.logoContainer}>
          <img
            className={classes.logo}
            src="/images/logo.svg"
            alt="/images/logo.svg"
          />
          <span>REACT</span>
        </div>
        {iconAction()}
      </div>
      <Divider />
      <List>
        {props.navItems.map(navItem => (
          <NavItem key={navItem.id} {...navItem} />
        ))}
      </List>
      <Divider />
    </React.Fragment>
  );
};

const Navbar = props => {
  const { classes } = props;
  const navItems = navigation;
  return (
    <React.Fragment>
      <Hidden xsDown implementation="js">
        <Drawer
          variant="permanent"
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: props.open,
            [classes.drawerClose]: !props.open
          })}
          classes={{
            paper: classNames({
              [classes.drawerOpen]: props.open,
              [classes.drawerClose]: !props.open
            })
          }}
          onMouseEnter={props.handleMouseEnter}
          onMouseLeave={props.handleMouseLeave}
          open={props.open}
        >
          <SideNav
            navItems={navItems}
            classes={classes}
            variant="permanent"
            handleDrawerDock={props.toggleDrawerDock}
          />
        </Drawer>
      </Hidden>
      <Hidden smUp implementation="js">
        <Drawer
          variant="temporary"
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: props.open,
            [classes.drawerClose]: !props.open
          })}
          classes={{
            paper: classNames({
              [classes.drawerOpen]: props.open,
              [classes.drawerClose]: !props.open
            })
          }}
          onClose={props.handleDrawerClose}
          open={props.open}
        >
          <SideNav
            navItems={navItems}
            classes={classes}
            variant="temporary"
            handleDrawerClose={props.handleDrawerClose}
          />
        </Drawer>
      </Hidden>
    </React.Fragment>
  );
};

export default withStyles(styles, { withTheme: true })(Navbar);
