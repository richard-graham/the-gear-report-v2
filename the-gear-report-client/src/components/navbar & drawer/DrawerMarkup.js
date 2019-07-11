import React, { Component, Fragment } from 'react'

import PropTypes from 'prop-types'
import { getIcon } from '../../util/getIcon'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import {withStyles} from '@material-ui/core/styles'
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

export class DrawerMarkup extends Component {

  state = {
    open: true, 
    mobileOpen: false,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleMobileDrawerOpen = () => {
    this.setState({ mobileOpen: true });
  };

  render() {
    const { 
      subsOpen,
      classes,
      handleDrawerClose,
      handleToggleSubsList,
      subAreas,
      authenticated
    } = this.props

    return (
      <Fragment>
        <div className={classes.navDrawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon /> 
          </IconButton>
        </div>
        <Divider />
        <List>
          {['Home', 'Alerts', 'Map'].map((text) => {
            const link = text === 'Home' ? '' : text.toLowerCase()
            return (
              <ListItem button key={text} component={Link} to={`/${link}`}>
                {getIcon(text)}
                <ListItemText primary={text} />
              </ListItem>
            )
          })}
        </List>
        <Divider />
        <List>
          {['Events', 'Route Finder'].map((text) => (      
              <ListItem button key={text} component={Link} to={`/${text.toLowerCase()}`}>
                {getIcon(text)}
                <ListItemText primary={text} />
              </ListItem> 
          ))}
          {authenticated &&
          <Fragment>
            <ListItem button onClick={handleToggleSubsList}>
              {getIcon('My Crags')}
              <ListItemText inset primary="My Crags" />
                {!subsOpen ? <ExpandMore /> : <ExpandLess />}
            </ListItem>
            <Collapse in={subsOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {subAreas && Object.keys(subAreas).map((areaId, i) => {
                  return (
                    <ListItem button className={classes.nested} key={i} component={Link} to={`/location/${areaId}`}>
                      <ListItemText inset primary={subAreas[areaId].name} />
                    </ListItem>
                  )
                })}
              </List>
            </Collapse>
          </Fragment>}

          <ListItem component={Link} to='/contributors' button key='Contributors'>
            {getIcon('Contributors')}
            <ListItemText primary='Contributors' />
          </ListItem>
        </List>
        <Divider />

        <List>
          {['About', 'FAQ', 'Donate', 'Send Feedback'].map((text) => (
              <ListItem component={Link} to={`/${text.toLowerCase()}`} button key={text}>
                {getIcon(text)}
                <ListItemText primary={text} />
              </ListItem>
          ))}
        </List>
      </Fragment>
    )
  }
}

DrawerMarkup.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = theme => ({
  ...theme,
  
})

const mapStateToProps = state => ({
  subAreas: state.user.credentials.subAreas,
  authenticated: state.user.authenticated
})

export default connect(mapStateToProps)(withStyles(styles)(DrawerMarkup))
