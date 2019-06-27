import React, { Component } from 'react'
import { connect } from 'react-redux'
import { subscribeToCrag, unsubscribeFromCrag } from '../../../../redux/actions/userActions.js'
//Mui
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

class LocationInfo extends Component {

  getInfoMarkup = () => {
    const {
      approachTime,
      numberRoutes,
      subType,
      type,
      grade,
      height,
      bolts,
      style
    } = this.props.location
  
    let areaMarkup = []
    
    if(approachTime) areaMarkup.push(`Approach Time: ${approachTime}`)
    if(numberRoutes) areaMarkup.push(`Routes: ${numberRoutes}`)
    if(subType) {
      areaMarkup.push(`Type: ${subType.substring(0, 1).toUpperCase() + subType.substring(1)}`)
      } else {
        areaMarkup.push(`Type: ${type.substring(0, 1).toUpperCase() + type.substring(1)}`)
      }
    if(grade) areaMarkup.push(`Grade: ${grade}`)
    if(style) areaMarkup.push(`Style: ${style}`)
    if(height) areaMarkup.push(`Height: ${height[0]}${height[1]}`)
    if(bolts) areaMarkup.push(`Bolts: ${bolts}`)

    return areaMarkup
  }

  handleSubscribe = () => {
    this.props.subscribeToCrag(this.props.location)
  }

  handleUnsubscribe = () => {
    this.props.unsubscribeFromCrag(this.props.location)
  }

  render(){
    const { location, user, subAreas } = this.props
    const markup = this.getInfoMarkup(location)
    console.log(location);
    console.log(user);

    return (
      <div>
        {markup.map((data, i) => <Typography variant='body1' key={i}>{data}</Typography>)}
        <br />
        {location.subType === 'Crag' && 
          user.authenticated && 
          subAreas[location.id] ? (
            <Button
              variant='outlined' 
              color='secondary' 
              size='medium'
              onClick={this.handleUnsubscribe}
            >
              Remove from my crags
            </Button>
          ) : (
            <Button 
              variant='outlined' 
              color='primary' 
              size='medium'
              onClick={this.handleSubscribe}
            >
              Add to my crags
            </Button>
          )
        }
      </div>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(LocationInfo)