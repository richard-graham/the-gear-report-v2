import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getIcon } from '../../util/getIcon'

import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Hidden from '@material-ui/core/Hidden'
import Collapse from '@material-ui/core/Collapse';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import NavBarContents from './NavBar'


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
    const { open, mobileOpen, subsOpen } = this.state;
    const { classes, theme } = this.props;

    // const getIcon = (index) => {
    //   switch(index){
    //     case 'Home':
    //       return <HomeIcon />
    //     case 'Alerts':
    //       return <AlertIcon />
    //     case 'Subscriptions':
    //       return <SubscriptionIcon />
    //     case 'Events':
    //      return <EventIcon />
    //     case 'Route Finder':
    //       return <RouteFinderIcon />
    //     case 'Contributors':
    //       return <ContributorsIcon />
    //     case 'About':
    //       return <AboutIcon />
    //     case 'FAQ':
    //       return <FAQIcon />
    //     case 'Donate':
    //       return <DonateIcon />
    //     case 'Send Feedback':
    //       return <FeedbackIcon />
    //     default:
    //       return null
    //   }
    // }

    const drawer = (
      <Fragment>
        <div className={classes.drawerHeader}>
          <IconButton onClick={this.handleDrawerClose}>
            <ChevronLeftIcon /> 
          </IconButton>
        </div>
        <Divider />
        <List>
          {['Home', 'Alerts', 'Subscriptions'].map((text) => (
            <ListItem button key={text}>
              {getIcon(text)}
            <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['Events', 'Route Finder'].map((text) => (
            <ListItem button key={text}>
              {getIcon(text)}
              <ListItemText primary={text} />
            </ListItem>
          ))}
      
          <ListItem button onClick={this.handleToggleSubsList}>
            {getIcon('My Crags')}
            <ListItemText inset primary="My Crags" />
              {!subsOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={subsOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemText inset primary="Kawakawa Bay" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemText inset primary="Froggatt Edge" />
              </ListItem>
            </List>
          </Collapse>

          <ListItem button key='Contributors'>
            {getIcon('Contributors')}
            <ListItemText primary='Contributors' />
          </ListItem>
        </List>
        <Divider />

        <List>
          {['About', 'FAQ', 'Donate', 'Send Feedback'].map((text) => (
              <ListItem button key={text}>
                {getIcon(text)}
                <ListItemText primary={text} />
              </ListItem>
            ))}
        </List>
      </Fragment>
  );

  const mobileDrawer = (
    <Fragment>
      <div className={classes.drawerHeader}>
        <IconButton onClick={this.handleMobileDrawerClose}>
          <ChevronLeftIcon /> 
        </IconButton>
      </div>
      <Divider />
      <List>
        {['Home', 'Alert', 'Subscriptions'].map((text) => (
          <ListItem button key={text}>
            {getIcon(text)}
          <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Events', 'Route Finder', 'Contributors'].map((text) => (
          <ListItem button key={text}>
            {getIcon(text)}
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />

      <List>
        <ListItem button onClick={this.handleToggleSubsList}>
          <ListItemIcon>
            {getIcon('My Crags')}
          </ListItemIcon>
          <ListItemText inset primary="My Crags" />
            {!subsOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={subsOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemText inset primary="Kawakawa Bay" />
            </ListItem>
          </List>
        </Collapse>
      </List>
    </Fragment>
  )

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
              onClose={this.handleDrawerClose}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
            {mobileDrawer}
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
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          <Typography paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent
            elementum facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in
            hendrerit gravida rutrum quisque non tellus. Convallis convallis tellus id interdum
            velit laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing.
            Amet nisl suscipit adipiscing bibendum est ultricies integer quis. Cursus euismod quis
            viverra nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo.
            Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus
            at augue. At augue eget arcu dictum varius duis at consectetur lorem. Velit sed
            ullamcorper morbi tincidunt. Lorem donec massa sapien faucibus et molestie ac.
          </Typography>
          <Typography paragraph>
            Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla
            facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac
            tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat
            consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus
            sed vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in.
            In hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
            et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique
            sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis eleifend. Commodo
            viverra maecenas accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam
            ultrices sagittis orci a.
          </Typography>
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