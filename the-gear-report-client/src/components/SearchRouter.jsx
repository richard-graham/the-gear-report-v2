import React, { Component } from 'react'
import { connect } from 'react-redux'
import { removeSearched } from '../redux/actions/UIActions'
import { getLocationData } from '../redux/actions/tcActions'

export class SearchRouter extends Component {
  state = {
    redirected: false
  }

  componentDidMount = () => {
    this.props.getLocationData('11737723') // sets nz as country on load
  }

  componentWillUpdate = (prevProps, prevState, snapshot) => {
    // Updates location based on searchbar onclick
    if(prevProps.searched && !prevState.redirected){
      this.setState({ redirected: true }, () => this.props.history.push(`/location/${prevProps.id}`))
      this.props.removeSearched()
    } else if (!prevProps.searched && prevState.redirected){
      this.setState({ redirected: false })
    }
  }

  render() {
    return (
      <div>
        
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  searched: state.UI.location.searched,
  id: state.UI.location.id
})

const mapDispatchToProps = {
  removeSearched,
  getLocationData
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchRouter)
