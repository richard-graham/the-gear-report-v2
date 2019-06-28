import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { subscribeToCrag, unsubscribeFromCrag } from '../../../../redux/actions/userActions.js'
//Mui
import Button from '@material-ui/core/Button'

export class SubButton extends Component {

  handleSubscribe = () => {
    this.props.subscribeToCrag(this.props.location)
  }

  handleUnsubscribe = () => {
    this.props.unsubscribeFromCrag(this.props.location)
  }

  checkCondition = () => {
    if(
      this.props.user &&
      this.props.location.subType === 'Crag' && 
      this.props.user.authenticated && 
      this.props.subAreas 
    ){
      return true
    } else {
      return false
    }
  }

  render(){
    const { location, subAreas } = this.props
    const shouldRender = this.checkCondition()
    return shouldRender ? (
      <Fragment>
        {subAreas[location.id] ? (
            <Button
              variant='outlined' 
              color='secondary' 
              size='medium'
              onClick={this.handleUnsubscribe}
              style={{ marginTop: 20 }}
            > 
              Remove from my crags
            </Button>
          ) : (
            <Button 
              variant='outlined' 
              color='primary' 
              size='medium'
              onClick={this.handleSubscribe}
              style={{ marginTop: 20 }}
            >
              Add to my crags
            </Button>
          )
        }
      </Fragment>  
    ) : null
  }
}

const mapStateToProps = state => ({
  user: state.user,
  location: state.UI.location,
  subAreas: state.user.credentials.subAreas
})

const mapDispatchToProps = {
  subscribeToCrag,
  unsubscribeFromCrag
}

export default connect(mapStateToProps, mapDispatchToProps)(SubButton)