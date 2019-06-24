import React from 'react'
// Mui
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

const Beta = (props) => {
  const { locationBeta, classes } = props
  return (
    locationBeta.map((beta, i) => {
      const { name, markdown} = beta
      return (
        <Grid container item xs={12} key={i} spacing={2}>
          <Grid item xs={3} md={2}>
            <Typography  
              variant={'h6'}
              className={classes.header}
              >{!name.startsWith('Unique') ? name : 'Unique Features'}</Typography>
            </Grid>
            <Grid item xs={9} md={10}>
            <Typography  
              gutterBottom variant={'body1'}
              className={classes.content}
              >{markdown}</Typography>
            </Grid>
        </Grid>
      )
    })
  )
}

const styles = theme => ({
  ...theme,
  header: {
    textAlign: 'left'
  },
  content: {
    textAlign: 'left',
    marginTop: 5
  }
})

export default withStyles(styles)(Beta)