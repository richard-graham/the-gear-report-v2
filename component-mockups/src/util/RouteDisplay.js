import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch  } from 'react-router-dom'
import home from '../pages/home'

//mui



export class RouteDisplay extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={home} />
        </Switch>
      </Router>
    )
  }
}

export default RouteDisplay
