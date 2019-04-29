import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch  } from 'react-router-dom'
import home from '../pages/home'
import NewUserForm from '../components/pages/signup/NewUserForm'

//mui
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  },
  content: {
    width: '95%',
    maxWidth: 1400,
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    },
  }
})

export class RouteDisplay extends Component {
  render() {
    const { classes } = this.props
    return (
      <Fragment>
        <div className={classes.root}>
          <div className={classes.content}>
            <Router>
              
              <Switch>
                
                <Route exact path='/' component={home} />
                <Route exact path='/signup' component={NewUserForm} />

              </Switch>
              
            </Router>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default withStyles(styles)(RouteDisplay)
