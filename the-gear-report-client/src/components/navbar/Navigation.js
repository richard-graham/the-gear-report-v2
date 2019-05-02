import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { DrawerMarkup } from './DrawerMarkup'
import RouteDisplay from '../../util/RouteDisplay'
import { BrowserRouter as Router } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden'

import AppBarMarkup from './AppBarMarkup'
import MobileAppBarMarkup from './MobileAppBarMarkup'

const styles = theme => ({
  ...theme
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
      <Router>
        <div className={classes.navRoot}>
          <CssBaseline />
          <Hidden mdUp implementation="css">
            <MobileAppBarMarkup mobileOpen={mobileOpen} handleMobileDrawerOpen={this.handleMobileDrawerOpen} />
          </Hidden>
          <Hidden smDown implementation="css">
            <AppBarMarkup open={open} handleDrawerOpen={this.handleDrawerOpen} />
          </Hidden>

          <nav className={classes.navDrawer}>

            <Hidden mdUp implementation="css">
              <Drawer
                container={this.props.container}
                variant="temporary"
                anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                open={mobileOpen}
                onClose={this.handleMobileDrawerClose}
                classes={{
                  paper: classes.navDrawerPaper,
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
                  paper: classes.navDrawerPaper,
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
            className={classNames(classes.navContent, {
              [classes.navContentShift]: open,
            })}
          >
            <div className={classes.navDrawerHeader} />
            
            <RouteDisplay />

          </main>
        </div>
      </Router>
    );
  }
}

Navigation.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Navigation);