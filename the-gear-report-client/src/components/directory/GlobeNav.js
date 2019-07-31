import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import { updateLocation } from '../../redux/actions/UIActions'
import { connect } from 'react-redux'
import { checkIfBelowCrag } from '../../util/functions'
import history from '../../util/history'
//Mui
import { withStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader'

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

    //if user selects location close any opened locations on the same level
      var indexAndChildren = this.findIndexAndChildren(index)
      var newState = {}

      //Set all levels including and below selected row to false
      Object.keys(this.state).forEach(existingIndex => {
        indexAndChildren.forEach(level => {
          if(existingIndex.startsWith(level)) newState[existingIndex] = false
        })   
      })

      this.setState({
        ...this.state,
        ...newState,
        [index]: this.state[index] ? !this.state[index] : true,
        selectedIndex: index,
      })

      if(checkIfBelowCrag(loc.type)){
        history.push('/test')
      }
  }

  findIndex = (i, noOfIndex, newState, location) => {
    var indent = ''
    switch(noOfIndex - i){
      case 1:
        indent = 'baselvl0'
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

  findIndexAndChildren = (index) => {
    switch(index.slice(0, -1)){ //remove indexNum on end of index
      case 'baselvl':
        return ['firstlvl', 'secondlvl', 'thirdlvl', 'fourthlvl', 'fifthlvl', 'sixthlvl']
      case 'firstlvl':
        return ['firstlvl', 'secondlvl', 'thirdlvl', 'fourthlvl', 'fifthlvl', 'sixthlvl']
      case 'secondlvl':
        return ['secondlvl', 'thirdlvl', 'fourthlvl', 'fifthlvl', 'sixthlvl']
      case 'thirdlvl':
        return ['thirdlvl', 'fourthlvl', 'fifthlvl', 'sixthlvl']
      case 'fourthlvl':
        return ['fourthlvl', 'fifthlvl', 'sixthlvl']
      case 'fifthlvl':
        return ['fifthlvl', 'sixthlvl']
      default:
        return []
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
        <List 
          className={classes.nav}
          subheader={
            <ListSubheader component="div" style={{ textAlign: 'left'}} >
              Navigation
            </ListSubheader>
          }
        >
          <ListItem
            key={'baselvl0'}
            button
            selected={selectedIndex === 'baselvl0'}
            onClick={() => this.handleListItemClick('baselvl0', country.parent, 6)}
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
                    onClick={() => this.handleListItemClick(key, loc, 7)}
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
                            onClick={() => this.handleListItemClick(key, loc, 9)}
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
                                    onClick={() => this.handleListItemClick(key, loc, 11)}
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
                                          onClick={() => this.handleListItemClick(key, loc, 12)}
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
                                              onClick={() => this.handleListItemClick(key, loc, 16)}
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
