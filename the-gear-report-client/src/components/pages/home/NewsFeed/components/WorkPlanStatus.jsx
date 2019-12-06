import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'

import Typography from '@material-ui/core/Typography';

export class WorkPlanStatus extends Component {

  state = {
    expanded: false
  }

  render() {

    const { classes, item } = this.props
    const { userHandle, alertTitle, locationName, type } = item

    return (
      <div className={classes.card}>
        <Typography>
          {userHandle} marked their Workplan for a {alertTitle} at {locationName} as 
          {type === 'completedWorkPlan' ? 'Completed' : 'Uncompleted'}
        </Typography>
      </div>
    )
  }
}

const styles = theme => ({
  card: {
    borderRadius: '5px',
    padding: '20px',
    margin: '5px'
  }
});


export default withStyles(styles)(WorkPlanStatus)
