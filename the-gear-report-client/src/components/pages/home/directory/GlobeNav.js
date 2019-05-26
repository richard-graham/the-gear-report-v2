import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import { updateLocation } from '../../../../redux/actions/UIActions'
import { connect } from 'react-redux'
//Mui
import { withStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
  nestedLevel1: {
    paddingLeft: theme.spacing.unit * 4,
  },
  nestedLevel2: {
    paddingLeft: theme.spacing.unit * 6,
  },
  nestedLevel3: {
    paddingLeft: theme.spacing.unit * 8,
  },
  nestedLevel4: {
    paddingLeft: theme.spacing.unit * 10,
  },
  nav: {
    maxHeight: 484,
    overflowY: 'auto'
  },
});


export class GlobeNav extends Component {
  state = {
    selectedIndex: 999,
    base: true
  }

  handleListItemClick = (event, index, loc) => {
    if (loc !== this.props.UI.location) this.props.updateLocation(loc)
    this.setState({ 
      selectedIndex: index,
      [index]: this.state[index] ? !this.state[index] : true
    })
  };

  render() {
    const { 
      classes, 
      UI: {
        country
      },
      selectLoc
    } = this.props
    const { selectedIndex } = this.state
    return (
        <List className={classes.nav}>
          <ListItem
            key={999}
            id={'base'}
            button
            selected={selectedIndex === 999}
            onClick={event => this.handleListItemClick(event, 'base')}
          >
            <ListItemText primary={country.parent.Name} />
          </ListItem>
          <Collapse in={this.state.base} timeout="auto" unmountOnExit>
            {country[country[selectLoc][0].ParentID].map((loc, i) => {
              const key = `firstlvl${i}`
              return (
                <Fragment key={key} >
                  <ListItem 
                    className={classes.nestedLevel1}
                    key={key}
                    button
                    selected={selectedIndex === i}
                    onClick={event => this.handleListItemClick(event, key, loc)}
                  >
                    <ListItemText primary={loc.Name} />
                  </ListItem>
                  <Collapse in={this.state[key]} timeout="auto" unmountOnExit>
                    {country[loc.NodeID] && country[loc.NodeID].map((loc, i) => {
                      const key = `secondlvl${i}`
                      return (
                        <Fragment key={key} >
                          <ListItem 
                            className={classes.nestedLevel2}
                            key={key}
                            button
                            selected={selectedIndex === i}
                            onClick={event => this.handleListItemClick(event, key, loc)}
                            open={this.state.key}
                          >
                            <ListItemText primary={loc.Name} />
                          </ListItem>
                          <Collapse in={this.state[key]} timeout="auto" unmountOnExit>
                            {country[loc.NodeID] && country[loc.NodeID].map((loc, i) => {
                              const key = `thirdlvl${i}`
                              return (
                                <Fragment key={key} >
                                  <ListItem 
                                    className={classes.nestedLevel3}
                                    key={key}
                                    button
                                    selected={selectedIndex === i}
                                    onClick={event => this.handleListItemClick(event, key, loc)}
                                    open={this.state.key}
                                  >
                                    <ListItemText primary={loc.Name} />
                                  </ListItem>
                                  <Collapse in={this.state[key]} timeout="auto" unmountOnExit>
                                  {country[loc.NodeID] && country[loc.NodeID].map((loc, i) => {
                                    const key = `fourthlvl${i}`
                                    return (
                                      <Fragment key={key}>
                                        <ListItem 
                                          className={classes.nestedLevel4}
                                          key={key}
                                          button
                                          selected={selectedIndex === i}
                                          onClick={event => this.handleListItemClick(event, key, loc)}
                                          open={this.state.key}
                                        >
                                          <ListItemText primary={loc.Name} />
                                        </ListItem>
                                        <Collapse in={this.state[key]} timeout="auto" unmountOnExit>
                                        {country[loc.NodeID] && country[loc.NodeID].map((loc, i) => {
                                          const key = `fifthlvl${i}`
                                          return (
                                            <ListItem 
                                              className={classes.nestedLevel4}
                                              key={key}
                                              button
                                              selected={selectedIndex === i}
                                              onClick={event => this.handleListItemClick(event, key, loc)}
                                              open={this.state.key}
                                            >
                                              <ListItemText primary={loc.Name} />
                                            </ListItem>
                                          )
                                        })}
                                        </Collapse>
                                      </Fragment>
                                      )
                                    })}
                                  </Collapse>
                                </Fragment>
                              )
                            })}
                          </Collapse>
                        </Fragment>
                      )
                    })}
                  </Collapse>
                </Fragment>
              )
            })}
          </Collapse>
        </List>
    )
  }
}

GlobeNav.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  UI: state.UI
})

export default connect(mapStateToProps, { updateLocation })(withStyles(styles)(GlobeNav))
