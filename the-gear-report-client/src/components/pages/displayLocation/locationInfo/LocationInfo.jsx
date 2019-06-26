import React from 'react'
//Mui
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'


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

const LocationInfo = (props) => {
  const markup = getMarkup(props.location)
  return (
    <div>
      {markup.map(data => <Typography variant='body1'>{data}</Typography>)}
    </div>
  )
}

const styles = {

}

export default withStyles(styles)(LocationInfo)