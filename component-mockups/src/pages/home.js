import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';


const styles = {
  home: {
    width: '100%',
    height: '100vw',
    backgroundColor: 'red',
  }
}

export class home extends Component {
  render() {
    const { classes } = this.props
    return (
      <div className={classes.home}>
        HOME
      </div>
    )
  }
}

export default withStyles(styles)(home)
