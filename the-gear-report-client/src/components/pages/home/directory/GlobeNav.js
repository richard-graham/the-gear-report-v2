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

  handleListItemClick = (index, loc, zoom) => {
    if (loc.id !== Number(this.props.location.id)) this.props.updateLocation(loc, zoom)
    this.setState({ 
      selectedIndex: index,
      [index]: this.state[index] ? !this.state[index] : true
    })
  }

  findIndex = (i, noOfIndex, newState, location) => {
    console.log(location);
    var result = null
    var indent = ''
    // console.log(newState);
    switch(noOfIndex - i){
      case 1:
        indent = 'base'
        break
      case 2:
        indent = 'firstlvl'
        break
      case 3:
        indent = 'secondlvl'
        break
      case 4:
        indent = 'thirdlvl'
        break
      case 5:
        indent = 'fourthlvl'
        break
      case 6: 
        indent = 'fifthlvl'
        break
      case 7:
        indent = 'sixthlvl'
        break
      default:
        indent = ''
    }
    var position = null
    Object.keys(newState).length === 1
      ? position = Object.keys(this.props.country[location.parentID]).indexOf(location.name)
      : position = ''

    return [`${indent}${position}`, location.parentID]
  }

  componentWillReceiveProps = (nextProps) => {
    var location = nextProps.location
    if(nextProps.location.searched){
      var noOfIndex = Number(location.depth)
      var parent = null
      var newState = {}
      for (var i = 0; i < noOfIndex; i++){
        console.log(parent);
        var arr = this.findIndex(i, noOfIndex, newState, !parent ? location : this.props.country[parent])
        newState[arr[0]] = true
        parent = arr[1]
      }
      console.log(newState);
    }
  }

  render() {
    const { 
      classes, 
      country,
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
            onClick={() => this.handleListItemClick('base', country.parent, 5)}
          >
            <ListItemText primary={country.parent.name} />
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
                    onClick={() => this.handleListItemClick(key, loc, 6)}
                  >
                    <ListItemText primary={loc.name} />
                  </ListItem>
                  <Collapse in={this.state[key]} timeout="auto" unmountOnExit>
                    {country[loc.id] && Object.entries(country[loc.id]).map((item, i) => {
                      const loc = item[1]
                      const key = `secondlvl${i}`
                      return (
                        <Fragment key={key} >
                          <ListItem 
                            className={classes.nestedLevel2}
                            key={key}
                            button
                            selected={selectedIndex === i}
                            onClick={() => this.handleListItemClick(key, loc, 8)}
                            open={this.state.key}
                          >
                            <ListItemText primary={loc.name} />
                          </ListItem>
                          <Collapse in={this.state[key]} timeout="auto" unmountOnExit>
                            {country[loc.id] && Object.entries(country[loc.id]).map((item, i) => {
                              const loc = item[1]
                              const key = `thirdlvl${i}`
                              return (
                                <Fragment key={key} >
                                  <ListItem 
                                    className={classes.nestedLevel3}
                                    key={key}
                                    button
                                    selected={selectedIndex === i}
                                    onClick={() => this.handleListItemClick(key, loc, 9)}
                                    open={this.state.key}
                                  >
                                    <ListItemText primary={loc.name} />
                                  </ListItem>
                                  <Collapse in={this.state[key]} timeout="auto" unmountOnExit>
                                  {country[loc.id] && Object.entries(country[loc.id]).map((item, i) => {
                                    const loc = item[1]
                                    const key = `fourthlvl${i}`
                                    return (
                                      <Fragment key={key}>
                                        <ListItem 
                                          className={classes.nestedLevel4}
                                          key={key}
                                          button
                                          selected={selectedIndex === i}
                                          onClick={() => this.handleListItemClick(key, loc, 9)}
                                          open={this.state.key}
                                        >
                                          <ListItemText primary={loc.name} />
                                        </ListItem>
                                        <Collapse in={this.state[key]} timeout="auto" unmountOnExit>
                                        {country[loc.id] && Object.entries(country[loc.id]).map((item, i) => {
                                          const loc = item[1]
                                          const key = `fifthlvl${i}`
                                          return (
                                            <ListItem 
                                              className={classes.nestedLevel5}
                                              key={key}
                                              button
                                              selected={selectedIndex === i}
                                              onClick={() => this.handleListItemClick(key, loc, 9)}
                                              open={this.state.key}
                                            >
                                              <ListItemText primary={loc.name} />
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
  country: state.UI.country,
  location: state.UI.location
})

export default connect(mapStateToProps, { updateLocation })(withStyles(styles)(GlobeNav))
