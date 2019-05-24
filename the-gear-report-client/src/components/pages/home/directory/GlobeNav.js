import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { getChildren } from '../../../../util/tcCalls'
//Mui
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
  root: {
    // width: '20%',
    backgroundColor: theme.palette.background.paper,
    height: '100%'
  },
  nestedLevel1: {
    paddingLeft: theme.spacing.unit * 4,
  },
  nestedLevel2: {
    paddingLeft: theme.spacing.unit * 8,
  },
  nestedLevel3: {
    paddingLeft: theme.spacing.unit * 12,
  },
  nav: {
    height: '100%',
    overflowY: 'scroll'
  }
});


export class GlobeNav extends Component {
  state = {
    selectedIndex: 0
  }

  handleListItemClick = (event, index) => {
    this.setState({ selectedIndex: index });
  };

  // componentDidMount = () => {
  //   getChildren('11737723')
  // }

  render() {
    const { 
      classes, 
      locationData,
      selectLoc
    } = this.props

    console.log(locationData['7546063'][0]);

    const navMarkup = (
      
      <List className={classes.nav}>
          <ListItem 
            button
            selected={this.state.selectedIndex === 0}
            onClick={event => this.handleListItemClick(event, 0)}
           >
            {locationData && selectLoc && <ListItemText primary={locationData[selectLoc][0].Name} />}
          </ListItem>
          <ListItem 
            button
            className={classes.nestedLevel1}
            selected={this.state.selectedIndex === 1}
            onClick={event => this.handleListItemClick(event, 1)}
          >
            <ListItemText primary='North Island' />
          </ListItem>
          <ListItem 
            button
            className={classes.nestedLevel1}
            selected={this.state.selectedIndex === 2}
            onClick={event => this.handleListItemClick(event, 2)}
          >
            <ListItemText primary='South Island' />
          </ListItem>
          <ListItem 
            button
            className={classes.nestedLevel1}
            selected={this.state.selectedIndex === 3}
            onClick={event => this.handleListItemClick(event, 3)}
          >
            <ListItemText primary='North Island' />
          </ListItem>
          <ListItem 
            button
            className={classes.nestedLevel1}
            selected={this.state.selectedIndex === 4}
            onClick={event => this.handleListItemClick(event, 4)}
          >
            <ListItemText primary='South Island' />
          </ListItem>
          <ListItem 
            button
            className={classes.nestedLevel1}
            selected={this.state.selectedIndex === 5}
            onClick={event => this.handleListItemClick(event, 5)}
          >
            <ListItemText primary='North Island' />
          </ListItem>
          <ListItem 
            button
            className={classes.nestedLevel1}
            selected={this.state.selectedIndex === 6}
            onClick={event => this.handleListItemClick(event, 6)}
          >
            <ListItemText primary='South Island' />
          </ListItem>
          <ListItem 
            button
            className={classes.nestedLevel1}
            selected={this.state.selectedIndex === 7}
            onClick={event => this.handleListItemClick(event, 7)}
          >
            <ListItemText primary='South Island' />
          </ListItem>
          <ListItem 
            button
            className={classes.nestedLevel1}
            selected={this.state.selectedIndex === 8}
            onClick={event => this.handleListItemClick(event, 8)}
          >
            <ListItemText primary='North Island' />
          </ListItem>
          <ListItem 
            button
            className={classes.nestedLevel1}
            selected={this.state.selectedIndex === 9}
            onClick={event => this.handleListItemClick(event, 9)}
          ></ListItem>
        </List>
    
    )

    return (
      <div className={classes.root}>
        {navMarkup}
      </div>
    )
  }
}

GlobeNav.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GlobeNav)
