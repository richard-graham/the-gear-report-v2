import React from 'react'
// Mui
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

const Beta = (props) => {
  const { locationBeta, classes } = props
  return (
    <div className={classes.container}>
    {locationBeta.map((beta, i) => {
      const { name, markdown} = beta
      return beta.inheritedFrom ? '' : (
        <div className={classes.row} key={i}>
          <div className={classes.headerContainer}>
            <Typography  
              variant={'h6'}
              className={classes.header}
              >{!name.startsWith('Unique') ? name : 'Unique Features'}</Typography>
            </div>
          <div className={classes.contentContainer}>
            <Typography  
              gutterBottom variant={'body1'}
              className={classes.content}
              >{markdown}</Typography>
          </div>
        </div>
      )
    })}
    </div>
  )
}

const styles = theme => ({
  ...theme,
  header: {
    textAlign: 'left',
    overFlowWrap: 'break-word'
  },
  content: {
    textAlign: 'left',
    marginTop: 5
  },
  container: {
    padding: 16,
    display: 'flex',
    flexDirection: 'column'
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column'
    },
  },
  headerContainer: {
    padding: 4,
    minWidth: 130
  },
  contentContainer: {
    padding: 4
  }
})

export default withStyles(styles)(Beta)