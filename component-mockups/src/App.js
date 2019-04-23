import React, { Component } from 'react';
import './App.css';
import Router from 'react-router-dom'

import Navigation from './components/navbar/Navigation'


class App extends Component {
  render() {
    return (
      <div className="App">
          <Navigation />

      </div>
    );
  }
}

export default App;
