import React, { Component } from 'react';
import './App.css';

import Navigation from './components/navbar/Navigation'

//Redux
import { Provider } from 'react-redux'
import store from './redux/store'
import { SET_AUTHENTICATED } from './redux/types'
import { logoutUser, getUserData } from './redux/actions/userActions'

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
