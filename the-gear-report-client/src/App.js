import React, { Component } from 'react'
import { Route  } from 'react-router-dom'
import { connect } from 'react-redux'
import AuthRoute from './util/AuthRoute'
import { BrowserRouter as Router } from 'react-router-dom'
// Components
import Navigation from './components/navbar & drawer/Navigation'
import home from './components/pages/home/home'
import NewUserForm from './components/pages/signup/NewUserForm'
import Login from './components/pages/login/Login'
import ActionButton from './components/ActionButton'
import MySnackBar from './util/MySnackBar'
import Profile from './components/pages/profile/Profile'
import AllAlerts from './components/pages/alerts/AllAlerts'
import Alert from './components/pages/alerts/Alert'
//mui
import { withStyles } from '@material-ui/core/styles';


export class App extends Component {
  render() {
    const { classes, authenticated, error, message } = this.props

    const content = (
      <div className={classes.root}>
          <Route exact path='/' component={home} />
          <Route exact path='/signup' component={NewUserForm} />
          <Route exact path='/login' component={Login} />
          <AuthRoute path='/profile/:userHandle' component={Profile} />
          <Route exact path='/alerts' render={(props) => <AllAlerts {...props} handleDrawerClose={this.props.handleDrawerClose}/>} />
          <Route exact path='/alert/:alertId' component={Alert} />
          {authenticated === true && <Route path='/' component={ActionButton} />}
    
          {error ?  
            <MySnackBar variant='error' message={error} /> : 
            message ? 
            <MySnackBar variant='success' message={message} /> : 
            ''}
    </div>
    
    )

    return (
      <Router>
        <Navigation content={content} />
      </Router>
    )
  }
}

const styles = theme => ({
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center'
  },
})

const mapStateToProps = state => ({
  authenticated: state.user.authenticated,
  error: state.UI.errors.general,
  message: state.UI.message
})

export default connect(mapStateToProps)(withStyles(styles)(App))
