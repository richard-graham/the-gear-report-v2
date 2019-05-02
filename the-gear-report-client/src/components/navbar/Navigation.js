import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { DrawerMarkup } from './DrawerMarkup'
import RouteDisplay from '../../util/RouteDisplay'

import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden'

import AppBarMarkup from './AppBarMarkup'
import MobileAppBarMarkup from './MobileAppBarMarkup'

const drawerWidth = 240;

const styles = theme => ({
  ...theme,
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('md')]: {
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

class Navigation extends Component {
  state = {
    open: true, 
    mobileOpen: false,
    subsOpen: false
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

    return (
      <div className={classes.root}>
        <CssBaseline />
        <Hidden mdUp implementation="css">
          <MobileAppBarMarkup mobileOpen={mobileOpen} handleMobileDrawerOpen={this.handleMobileDrawerOpen} />
        </Hidden>
        <Hidden smDown implementation="css">
          <AppBarMarkup open={open} handleDrawerOpen={this.handleDrawerOpen} />
        </Hidden>

        <nav className={classes.drawer}>

          <Hidden mdUp implementation="css">
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

          <Hidden smDown implementation="css">
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