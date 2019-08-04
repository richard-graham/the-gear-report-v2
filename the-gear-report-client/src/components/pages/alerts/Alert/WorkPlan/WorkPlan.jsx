import React, { Component, Fragment } from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
//Mui
import { withStyles } from '@material-ui/core/styles'
import Slider from '@material-ui/lab/Slider';
import Tooltip from '@material-ui/core/Tooltip'
import Green from '@material-ui/core/colors/green'
import Paper from '@material-ui/core/Paper'
//Mui Icons
import AttachMoney from '@material-ui/icons/AttachMoney'
import { Typography } from '@material-ui/core';


export class WorkPlan extends Component {

  state = {
    value: 50,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  isExpired = assignment => {
    return !moment(assignment.completionDate).add('2', 'd').isAfter(new Date())
  }

  render() {
    const { assignments, classes } = this.props
    const { value } = this.state;

    return (
      <Fragment>
        {assignments.map((assignment, i) => {
          console.log(assignment);
          const { userImage, userHandle } = assignment
          return (
            <Paper className={classes.paper} key={i} elevation={1}>
              <Link to={`/profile/${userHandle}`}>
                <img 
                  alt='user' 
                  src={userImage} 
                  className={classes.userImage}
                />
              </Link>
              <Slider
                value={value}
                aria-labelledby="slider-image"
                onChange={this.handleChange}
                step={5}
                classes={{
                  container: classes.slider,
                  thumbIconWrapper: classes.thumbIconWrapper,
                }}
                thumb={
                  <Tooltip 
                    title={value} 
                    className={classes.tooltip}
                    interactive
                    leaveDelay={24}
                  >
                    <AttachMoney style={{ color: Green[500], height: 36, width: 36, borderRadius: '50%' }} />
                  </Tooltip>}
              />
            </Paper>
          )
        })}
      </Fragment>
    )
  }
}

const styles = {
  root: {
    width: 300,
  },
  slider: {
    padding: '22px 0px',
  },
  thumbIcon: {
    borderRadius: '50%',
  },
  thumbIconWrapper: {
    height: 36,
    width: 36
  },
  tooltip: {
    backgroundColor: '#fff',
  },
  paper: {
    marginBottom: 25
  },
  userImage: {
    height: 40,
    width: 40,
    borderRadius: '50%',
    marginRight: 15
  },
};

export default withStyles(styles)(WorkPlan)
