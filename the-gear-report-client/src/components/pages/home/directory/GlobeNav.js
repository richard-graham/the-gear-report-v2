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
  nestedLevel5: {
    paddingLeft: theme.spacing.unit * 12,
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

  handleListItemClick = (event, index, loc, zoom) => {
    if (loc !== this.props.UI.location) this.props.updateLocation(loc, zoom)
    this.setState({ 
      selectedIndex: index,
      [index]: this.state[index] ? !this.state[index] : true
    })
  }

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
            onClick={event => this.handleListItemClick(event, 'base', country.parent, 5)}
          >
            <ListItemText primary={country.parent.Name} />
          </ListItem>
          <Collapse in={this.state.base} timeout="auto" unmountOnExit>
            {Object.entries(country[selectLoc]).map((item, i) => {
              const loc = item[1]
              const key = `firstlvl${i}`
              return (
                <Fragment key={key} >
                  <ListItem 
                    className={classes.nestedLevel1}
                    key={key}
                    button
                    selected={selectedIndex === i}
                    onClick={event => this.handleListItemClick(event, key, loc, 6)}
                  >
                    <ListItemText primary={loc.Name} />
                  </ListItem>
                  <Collapse in={this.state[key]} timeout="auto" unmountOnExit>
                    {country[loc.NodeID] && Object.entries(country[loc.NodeID]).map((item, i) => {
                      const loc = item[1]
                      const key = `secondlvl${i}`
                      return (
                        <Fragment key={key} >
                          <ListItem 
                            className={classes.nestedLevel2}
                            key={key}
                            button
                            selected={selectedIndex === i}
                            onClick={event => this.handleListItemClick(event, key, loc, 8)}
                            open={this.state.key}
                          >
                            <ListItemText primary={loc.Name} />
                          </ListItem>
                          <Collapse in={this.state[key]} timeout="auto" unmountOnExit>
                            {country[loc.NodeID] && Object.entries(country[loc.NodeID]).map((item, i) => {
                              const loc = item[1]
                              const key = `thirdlvl${i}`
                              return (
                                <Fragment key={key} >
                                  <ListItem 
                                    className={classes.nestedLevel3}
                                    key={key}
                                    button
                                    selected={selectedIndex === i}
                                    onClick={event => this.handleListItemClick(event, key, loc, 9)}
                                    open={this.state.key}
                                  >
                                    <ListItemText primary={loc.Name} />
                                  </ListItem>
                                  <Collapse in={this.state[key]} timeout="auto" unmountOnExit>
                                  {country[loc.NodeID] && Object.entries(country[loc.NodeID]).map((item, i) => {
                                    const loc = item[1]
                                    const key = `fourthlvl${i}`
                                    return (
                                      <Fragment key={key}>
                                        <ListItem 
                                          className={classes.nestedLevel4}
                                          key={key}
                                          button
                                          selected={selectedIndex === i}
                                          onClick={event => this.handleListItemClick(event, key, loc, 9)}
                                          open={this.state.key}
                                        >
                                          <ListItemText primary={loc.Name} />
                                        </ListItem>
                                        <Collapse in={this.state[key]} timeout="auto" unmountOnExit>
                                        {country[loc.NodeID] && Object.entries(country[loc.NodeID]).map((item, i) => {
                                          const loc = item[1]
                                          const key = `fifthlvl${i}`
                                          return (
                                            <ListItem 
                                              className={classes.nestedLevel5}
                                              key={key}
                                              button
                                              selected={selectedIndex === i}
                                              onClick={event => this.handleListItemClick(event, key, loc, 9)}
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
