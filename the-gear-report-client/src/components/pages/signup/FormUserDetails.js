import React, { Component, Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Paper from  '@material-ui/core/Paper'
import { Typography } from '@material-ui/core';

export class FormUserDetails extends Component {

  continue = e => {
    e.preventDefault()
    this.props.nextStep()
  }

  render() {
    const { values, handleChange, classes } = this.props

    return (
      <Fragment>
        <Typography variant='h2' className={classes.header}>Welcome to the Gear Report</Typography>
        <Paper className={classes.paper}>
          <TextField 
            className={classes.textField}
            placeholder='Enter Your First Name'
            label='First Name' 
            onChange={handleChange('firstName')}
            defaultValue={values.firstName}
          />
          <br />
          <TextField 
            className={classes.textField}
            placeholder='Enter Your Last Name'
            label='Last Name' 
            onChange={handleChange('lastName')}
            defaultValue={values.lastName}
          />
          <br />
          <TextField 
            className={classes.textField}
            placeholder='Enter Your Email'
            label='Email' 
            onChange={handleChange('email')}
            defaultValue={values.email}
          />
          <br />
          <Button 
            color='primary'
            className={classes.button}
            onClick={this.continue}
            variant="contained"
          >Continue</Button>
        </Paper>
      </Fragment>
    )
  }
}

const styles = theme => ({
  button: {
    margin: 30,
  },
  paper: {
    paddingTop: 240,
    paddingBottom: 240,
    margin: 70
  },
  header: {
    fontSize: 35,
    padding: 20
  },
  textField: {

  }
})

export default withStyles(styles)(FormUserDetails)
