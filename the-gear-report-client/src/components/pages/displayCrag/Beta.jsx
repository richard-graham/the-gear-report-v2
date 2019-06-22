import React, { Fragment } from 'react'
// Mui
import Typography from '@material-ui/core/Typography'

const Beta = (props) => {
  const { locationBeta } = props
  return (
    locationBeta.map((beta, i) => {
      return (
        <Fragment key={i}>
          <Typography  variant={'h5'}>{beta.name}</Typography>
          <Typography  gutterBottom variant={'body1'}>{beta.markdown}</Typography>
        </Fragment>
      )
    })
  )
}

export default Beta