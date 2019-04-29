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
      <div className={classes.container}>
        
        <Paper className={classes.paper}>
        <Typography variant='h2' className={classes.header}>Welcome to the Gear Report</Typography>
          <TextField 
            variant='outlined'
            className={classes.textField}
            id="mui-theme-provider-outlined-input"
            label='First Name' 
            onChange={handleChange('firstName')}
            defaultValue={values.firstName}
          />
          <br />
          <TextField 
            variant='outlined'
            className={classes.textField}
            id="mui-theme-provider-outlined-input"
            label='Last Name' 
            onChange={handleChange('lastName')}
            defaultValue={values.lastName}
          />
          <br />
          <TextField 
            variant='outlined'
            className={classes.textField}
            id="mui-theme-provider-outlined-input"
            label='Email' 
            onChange={handleChange('email')}
            defaultValue={values.email}
          />
          <br/>
          <TextField 
            variant='outlined'
            className={classes.textField}
            id="mui-theme-provider-outlined-adornment-password"
            label='Password' 
            onChange={handleChange('password')}
            defaultValue={values.password}
            type='password'
          />
          <br />
          <TextField 
            variant='outlined'
            className={classes.textField}
            id="mui-theme-provider-outlined-adornment-password"
            label='Confirm Password' 
            onChange={handleChange('confirmPassword')}
            defaultValue={values.confirmPassword}
            type='password'
          />
          <br />
          <Button 
            color='primary'
            className={classes.button}
            onClick={this.continue}
            variant="contained"
          >Continue</Button>
        </Paper>
      </div>
    )
  }
}

const styles = theme => ({
  button: {
    margin: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 4
  },
  paper: {
    width: '40%',
    margin: 150,
    alignSelf: 'center'
  },
  header: {
    fontSize: 35,
    padding: 20,
    margin: 20,
  },
  textField: {
    margin: theme.spacing.unit,
    width: '60%',
  },
  container: {
    width: '100%',
    heigh: '100%',
    display: 'flex',
    flexDirection: 'column'
  }
})

export default withStyles(styles)(FormUserDetails)
