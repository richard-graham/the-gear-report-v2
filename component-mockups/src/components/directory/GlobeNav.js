import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
//Mui
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider';
import Collapse from '@material-ui/core/Collapse';

const styles = theme => ({
  root: {
    width: '20%',
    backgroundColor: theme.palette.background.paper,
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
});


export class GlobeNav extends Component {
  state = {
    selectedIndex: 0
  }

  handleListItemClick = (event, index) => {
    this.setState({ selectedIndex: index });
  };

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <List>
          <ListItem 
            button
            selected={this.state.selectedIndex === 0}
            onClick={event => this.handleListItemClick(event, 0)}
           >
            <ListItemText primary='New Zealand'  />
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

        </List>
        
      </div>
    )
  }
}

GlobeNav.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GlobeNav)
