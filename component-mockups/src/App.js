import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch  } from 'react-router-dom'

import Navigation from './components/navbar/Navigation'
import home from './pages/home'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Navigation />
          <Switch>
            <Route exact path='/' component={home} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
