import React, { Component } from 'react'
import { connect } from 'react-redux'
import { subscribeToCrag } from '../../../../redux/actions/userActions.js'
//Mui
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'


const getMarkup = location => {
  const {
    approachTime,
    numberRoutes,
    subType,
    type,
    grade,
    height,
    bolts,
    style
  } = location

  let markup = []

  if(approachTime) markup.push(`Approach Time: ${approachTime}`)
  if(numberRoutes) markup.push(`Routes: ${numberRoutes}`)
  if(subType) {
    markup.push(`Type: ${subType.substring(0, 1).toUpperCase() + subType.substring(1)}`)
    } else {
      markup.push(`Type: ${type.substring(0, 1).toUpperCase() + type.substring(1)}`)
    }
  if(grade) markup.push(`Grade: ${grade}`)
  if(style) markup.push(`Style: ${style}`)
  if(height) markup.push(`Height: ${height[0]}${height[1]}`)
  if(bolts) markup.push(`Bolts: ${bolts}`)


  return markup

}

class LocationInfo extends Component {

  handleSubscribe = () => {
    subscribeToCrag(this.props.location)
  }

  render(){
    const { location, user } = this.props
    const markup = getMarkup(location)

    return (
      <div>
        {markup.map((data, i) => <Typography variant='body1' key={i}>{data}</Typography>)}
        <br />
        {user.authenticated && 
          location.subType === 'Crag' && 
          <Button 
            variant='outlined' 
            color='primary' 
            size='medium'
            onClick={this.handleSubscribe}
          >
          Add to mycrags
          </Button>}
      </div>
    )
  }
}

const styles = {

}

const mapStateToProps = state => ({
  user: state.user,
  location: state.UI.location
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LocationInfo))