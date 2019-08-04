import React, { Component, Fragment } from 'react'
import moment from 'moment'
//Mui
import { withStyles } from '@material-ui/core/styles'


export class WorkPlan extends Component {

  isExpired = assignment => {
    return !moment(assignment.completionDate).add('2', 'd').isAfter(new Date())
  }

  render() {
    const { assignments, classes } = this.props
    console.log(assignments);

    return (
      <Fragment>
        {assignments.map((assignment, i) => {
          return (
            <div key={i}>
              <h1>Test</h1>
            </div>
          )
        })}
      </Fragment>
    )
  }
}

const styles = {

}

export default withStyles(styles)(WorkPlan)
