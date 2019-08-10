import React, { Component } from 'react'
import { connect } from 'react-redux'
// import AuthRoute from './util/AuthRoute'
import { Router, Route, Switch } from 'react-router-dom'
import history from './util/history'
// Components
import Navigation from './components/navbar & drawer/Navigation'
import home from './components/pages/home/home'
import NewUserForm from './components/pages/signup/NewUserForm'
import Login from './components/pages/login/Login'
import ActionButton from './components/ActionButton'
import MySnackBar from './util/MySnackBar'
import Profile from './components/pages/profile/Profile'
import AllAlerts from './components/pages/alerts/AllAlerts'
import Alert from './components/pages/alerts/Alert/Alert'
import DirectoryContainer from './components/directory/DirectoryContainer'
import SearchRouter from './components/SearchRouter'
import DisplayLocation from './components/pages/displayLocation/DisplayLocation'
import AddCc from './components/stripe/saveCc/AddCc'
import { withStyles } from '@material-ui/core/styles';


export class App extends Component {

  render() {
    const { classes, authenticated, error, message } = this.props


    const content = (
      <div className={classes.root}>
            <Route path='/*' component={SearchRouter} />
            <Route exact path='/' component={home} />
            <Route exact path='/signup' component={NewUserForm} />
            <Route exact path='/login' component={Login} />
            <Route path='/profile/:userHandle' component={Profile} />
            <Route exact path='/alerts' component={AllAlerts} />
            <Route exact path='/alert/:alertId' component={Alert} />
            <Route exact path='/map' component={DirectoryContainer} />
            <Route path='/location/:locationID' component={DisplayLocation} />
            <Route path='/add/payment' component={AddCc} />
          {authenticated === true && <Route path='/' component={ActionButton} />}
    
          {error.length > 0 ?  
            <MySnackBar variant='error' message={error} /> : 
            message.length > 0 ? 
            <MySnackBar variant='success' message={message} /> : 
            ''}
    </div>
    
    )

    return (
      <Router history={history}>
        <Switch>
          <Navigation content={content} />
        </Switch>
      </Router>
    )
  }
}

const styles = theme => ({
  root: {
    width: '100%',
    minHeight: 'calc(100vh - 64px)',
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center'
  },
})

const mapStateToProps = state => ({
  authenticated: state.user.authenticated,
  error: state.UI.errors.general,
  message: state.UI.message,
})

export default connect(mapStateToProps)(withStyles(styles)(App))
