import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch  } from 'react-router-dom'
import home from '../pages/home'
import NewUserForm from '../components/pages/signup/NewUserForm'
import Login from '../components/pages/login/Login'

//mui
import { withStyles } from '@material-ui/core/styles';

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
                <Route exact path='/login' component={Login} />

              </Switch>
              
            </Router>
          </div>
        </div>
      </Fragment>
    )
  }
}

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

export default withStyles(styles)(RouteDisplay)
