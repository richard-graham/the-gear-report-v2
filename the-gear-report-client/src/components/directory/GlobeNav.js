import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import { updateLocation } from '../../redux/actions/UIActions'
import { connect } from 'react-redux'
import { isCragOrUnder } from '../../util/functions'
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
    height: 'calc(100vh - 64px)',
    overflowY: 'auto'
  },
});

export class GlobeNav extends Component {
  state = {
    selectedIndex: 'baselvl0',
    baselvl0: true
  }

  handleListItemClick = (index, loc, zoom) => {
    if (loc.id !== Number(this.props.location.id)) this.props.updateLocation(loc, zoom)
    if(index.slice(0, -1) === this.state.selectedIndex.slice(0, -1)){ //if user selects location on the same level close any opened locations
      this.setState({
        [this.state.selectedIndex]: false
      })
    }
    
    this.setState({ 
      selectedIndex: index,
      [index]: this.state[index] ? !this.state[index] : true
    })
   
  }

  findIndex = (i, noOfIndex, newState, location) => {
    var indent = ''
    switch(noOfIndex - i){
      case 1:
        indent = 'baselvl'
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

    i === 0
      ? position = Object.keys(this.props.country[location.parentID]).indexOf(location.name)
      : position = Object.keys(this.props.country[location.ancestors[(noOfIndex - i) - 1].id]).indexOf(location.ancestors[noOfIndex - i].name)
    return noOfIndex - i === 1
    ? `${indent}`
    : `${indent}${position}`
     
  }

  componentWillReceiveProps = (nextProps) => {
    var location = nextProps.location
    if(nextProps.location.searched){
      //close all current drawers and rebuild them based on search
      var oldState = {}
      Object.keys(this.state).forEach(key => oldState[key] = false)
      this.setState(oldState, () => { // once old state is overwritten
        var noOfIndex = Number(location.depth)
        var newState = {}
        for (var i = 0; i < noOfIndex; i++){
          if(i === 0) newState.selectedIndex = this.findIndex(i, noOfIndex, newState, location) 
          newState[this.findIndex(i, noOfIndex, newState, location)] = true
        }
        this.setState(newState)  
      })
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
            key={'baselvl0'}
            button
            selected={selectedIndex === 'baselvl0'}
            onClick={() => this.handleListItemClick('baselvl0', country.parent, 5)}
          >
            <ListItemText primary={country.parent.name} />
          </ListItem>
          <Collapse in={this.state['baselvl0']} timeout="auto" unmountOnExit>
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
