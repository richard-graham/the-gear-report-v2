import React, { Component } from 'react'
import NavBarMarkup from '../NavBarMarkup'
import classNames from 'classnames';
//Mui
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

class MobileAppBarMarkup extends Component {

  render() {
    const { classes, mobileOpen, handleMobileDrawerOpen } = this.props
    return (
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
            onClick={handleMobileDrawerOpen}
            className={classNames(classes.menuButton, mobileOpen && classes.hide)}
          >
            <MenuIcon />
          </IconButton>

          <NavBarMarkup />

        </Toolbar>
      </AppBar>
    )
  }
}

const drawerWidth = 240;

const styles = theme => ({
  ...theme,
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
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
})

export default withStyles(styles)(MobileAppBarMarkup)