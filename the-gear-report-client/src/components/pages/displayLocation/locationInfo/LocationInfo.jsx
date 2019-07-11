import React, { Component } from 'react'
//Mui
import Typography from '@material-ui/core/Typography'

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

  render(){
    const { location } = this.props
    const markup = this.getInfoMarkup(location)

    return (
      <div>
        {markup.map((data, i) => <Typography variant='body1' key={i}>{data}</Typography>)}
      </div>
    ) 
  }
}

export default LocationInfo