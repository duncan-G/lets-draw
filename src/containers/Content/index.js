import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import AppToolbar from '../Toolbar';
import AppNavbar from '../Navbar';

import LetsDraw from '../LetsDraw';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
    height: '100%'
  },
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
  content: {
    height: '100%',
    flexGrow: 1,
  }
});

class AppContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      docked: false
    };
  }

  handleMouseEnter = () => {
    const { open } = this.state;
    if (!open) {
      this.setState({ open: true });
    }
  };

  handleMouseLeave = () => {
    const { docked } = this.state;
    if (!docked) {
      this.setState({ open: false });
    }
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  toggleDrawerDock = () => {
    this.setState(state => ({
      open: state.docked ? false : state.open,
      docked: !state.docked
    }));
  };

  render() {
    const { classes } = this.props;
    const { path } = this.props.match;
    console.dir(this.toolbarEl);
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppToolbar
          ref={node => {
            this.toolbarEl = node
          }}
          handleDrawerOpen={this.handleDrawerOpen}
          open={this.state.open}
        />
        <AppNavbar
          open={this.state.open}
          handleDrawerClose={this.handleDrawerClose}
          toggleDrawerDock={this.toggleDrawerDock}
          handleMouseEnter={this.handleMouseEnter}
          handleMouseLeave={this.handleMouseLeave}
        />

        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route path={path} component={LetsDraw} />
          </Switch>
        </main>
      </div>
    );
  }
}

AppContent.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(AppContent);
