import React, { Component } from 'react'
import DirectoryContainer from '../components/pages/home/directory/DirectoryContainer'
import { withStyles } from '@material-ui/core/styles'
//Mui
import Typography from '@material-ui/core/Typography'

const styles = {
  header: {
    fontSize: 35,
    padding: 20
  },
    subtitle1: {
      fontSize: 25,
      paddingBottom: 20
    }
}

export class home extends Component {
  render() {
    const { classes } = this.props
    return (
      <div>
        <Typography variant='h2' className={classes.header}>Welcome to the Gear Report</Typography>
        <Typography variant='h1' className={classes.subtitle1}>An attempt to catalog and share dangerous climbing gear with the community to make our sport safer</Typography>
        <br/>
        <DirectoryContainer />
      </div>
    )
  }
}

export default withStyles(styles)(home)
