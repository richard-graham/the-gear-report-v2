import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Globe from '../components/directory/Globe'
//Redux

const styles = {
  map: {
    height: 500 
  }
}

export class home extends Component {


  render() {
    const { classes } = this.props
    return (
      <div className="directory">
        <Globe className={classes.map} />
      </div>
    )
  }
}


export default withStyles(styles)(home)
