import React, { Component, Fragment } from 'react'
import { Route, Switch  } from 'react-router-dom'
import { connect } from 'react-redux'
import home from '../components/pages/home/home'
import NewUserForm from '../components/pages/signup/NewUserForm'
import Login from '../components/pages/login/Login'
import ActionButton from '../components/ActionButton'
import MySnackBar from './MySnackBar'
import Profile from '../components/pages/profile/Profile'
import AuthRoute from './AuthRoute'


//mui
import { withStyles } from '@material-ui/core/styles';

export class RouteDisplay extends Component {
  render() {
    const { classes, authenticated, error, message } = this.props
    return (
      <Fragment>
        <div className={classes.root}>
          <div className={classes.content}>
              
              <Switch>
                
                <Route exact path='/' component={home} />
                <Route exact path='/signup' component={NewUserForm} />
                <Route exact path='/login' component={Login} />
                <AuthRoute exact path='/profile' component={Profile} />

              </Switch>
              {authenticated === true && <ActionButton />}
              {error ?  
                <MySnackBar variant='error' message={error} /> : 
                message ? 
                <MySnackBar variant='success' message={message} /> : 
                ''}
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
    width: '85%',
    maxWidth: 1400,
    [theme.breakpoints.down('sm')]: {
      minWidth: 240,
      width: '95%'
    },
  }
})

const mapStateToProps = state => ({
  authenticated: state.user.authenticated,
  error: state.UI.errors.general,
  message: state.UI.message
})

export default connect(mapStateToProps)(withStyles(styles)(RouteDisplay))
