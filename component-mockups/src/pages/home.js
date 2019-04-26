import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Globe from '../components/directory/Globe'
import GlobeNav from '../components/directory/GlobeNav'
//Redux

const styles = {
  root: {
    display: 'flex'
  }
}

export class home extends Component {


  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <GlobeNav className={classes.nav} />
        <Globe className={classes.map} />
      </div>
    )
  }
}


export default withStyles(styles)(home)
