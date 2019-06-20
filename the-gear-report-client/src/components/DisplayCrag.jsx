import React, { Component } from 'react'
import { connect } from 'react-redux'

export class DisplayCrag extends Component {

  render() {
    const { location } = this.props
    console.log(location);
    // New Zealand should never be available to view in 
    return location ? (
      <div>
        <h1>{location.name}</h1>
      </div>
    ) : ''
  }
}

const mapStateToProps = (state) => ({
  location: state.UI.location
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayCrag)
