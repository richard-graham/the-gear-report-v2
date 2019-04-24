import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { DrawerMarkup } from './DrawerMarkup'
import RouteDisplay from '../../util/RouteDisplay'

import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Hidden from '@material-ui/core/Hidden'

import NavBarContents from './NavBarMarkup'


const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 2,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
});

class Navigation extends React.Component {
  state = {
    open: true, 
    mobileOpen: false,
    subsOpen: true
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleMobileDrawerOpen = () => {
    this.setState({ mobileOpen: true });
  };

  handleMobileDrawerClose = () => {
    this.setState({ mobileOpen: false });
  };

  handleToggleSubsList = () => {
    this.setState({ subsOpen: !this.state.subsOpen })
  }

  render() {
    const { classes, theme } = this.props;
    const { open, mobileOpen } = this.state

  const appBarMarkup = (
    <Fragment>
      <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>

            <NavBarContents />

          </Toolbar>
        </AppBar>
    </Fragment>
  )

  const mobileAppBarMarkup = (
    <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: mobileOpen,
          })}
        >
          <Toolbar disableGutters={false}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleMobileDrawerOpen}
              className={classNames(classes.menuButton, mobileOpen && classes.hide)}
            >
              <MenuIcon />
            </IconButton>

            <NavBarContents />

          </Toolbar>
        </AppBar>
  )



    return (
      <div className={classes.root}>
        <CssBaseline />
        <Hidden smUp implementation="css">
          {mobileAppBarMarkup}
        </Hidden>
        <Hidden xsDown implementation="css">
          {appBarMarkup}
        </Hidden>

        <nav className={classes.drawer}>

          <Hidden smUp implementation="css">
            <Drawer
              container={this.props.container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={mobileOpen}
              onClose={this.handleMobileDrawerClose}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              <DrawerMarkup
                handleDrawerClose={this.handleMobileDrawerClose}
                handleToggleSubsList={this.handleToggleSubsList}
                subsOpen={this.state.subsOpen}
                classes={classes}
              />
            </Drawer>
          </Hidden>

          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="persistent"
              open={open}
              onClose={this.handleDrawerClose}
            >
              <DrawerMarkup 
                handleDrawerClose={this.handleDrawerClose}
                handleToggleSubsList={this.handleToggleSubsList}
                subsOpen={this.state.subsOpen}
                classes={classes}
              />
            </Drawer>
          </Hidden>
        </nav>
        
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
           
          <RouteDisplay />


        </main>
      </div>
    );
  }
}

Navigation.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Navigation);