import React, { Component } from 'react';
import './App.css';
import jwtDecode from 'jwt-decode'
import axios from 'axios'

//Redux
import { Provider } from 'react-redux'
import store from './redux/store'
import { SET_AUTHENTICATED } from './redux/types'
import { logoutUser, getUserData } from './redux/actions/userActions'

// components
import Navigation from './components/navbar/Navigation'

axios.defaults.baseURL = 'https://us-central1-the-gear-report-a2ce8.cloudfunctions.net/api'

const token = localStorage.FBIdToken
if(token){
  const decodedToken = jwtDecode(token) // decodedToken.exp hold the expiry time of the token
  if(decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser())
    window.location.href = '/login'
  } else {
    store.dispatch({ type: SET_AUTHENTICATED })
    axios.defaults.headers.common['Authorization'] = token
    store.dispatch(getUserData())
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
            <Navigation />
            
        </div>
      </Provider>
    );
  }
}

export default App;
