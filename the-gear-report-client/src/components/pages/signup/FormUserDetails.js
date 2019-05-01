import React, { Component } from 'react'
import { connect } from 'react-redux'
//Mui
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
    const { values, handleChange, classes, UI: { errors } } = this.props

    return (
      <div className={classes.signupContainer}>
        
        <Paper className={classes.signupPaper}>
        <Typography variant='h2' className={classes.signupHeader}>Welcome to the Gear Report</Typography>
          <TextField 
            variant='outlined'
            className={classes.signupTextField}
            label='First Name' 
            onChange={handleChange('firstName')}
            defaultValue={values.firstName}
          />
          <br />
          <TextField 
            variant='outlined'
            className={classes.signupTextField}
            label='Last Name' 
            onChange={handleChange('lastName')}
            defaultValue={values.lastName}
          />
          <br />
          <TextField 
            variant='outlined'
            className={classes.signupTextField}
            label='Email' 
            onChange={handleChange('email')}
            defaultValue={values.email}
            error={errors.email ? true : false}
            helperText={errors.email}
          />
          <br/>
          <TextField 
            variant='outlined'
            className={classes.signupTextField}
            label='Password' 
            onChange={handleChange('password')}
            defaultValue={values.password}
            type='password'
            error={errors.password ? true : false || errors.confirmPassword ? true : false}
            helperText={errors.password || errors.confirmPassword}
          />
          <br />
          <TextField 
            variant='outlined'
            className={classes.signupTextField}
            label='Confirm Password' 
            onChange={handleChange('confirmPassword')}
            defaultValue={values.confirmPassword}
            type='password'
            error={errors.confirmPassword ? true : false}
            helperText={errors.confirmPassword}
          />
          <br />
          <Button 
            color='primary'
            className={classes.signupMultiButton}
            onClick={this.continue}
            variant="contained"
          >Continue</Button>
        </Paper>
      </div>
    )
  }
}

const styles = (theme) => ({
  ...theme,
  button: {
    margin: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 6
  },
  buttonProgress: { 
    position: 'absolute'
  },
})

const mapStateToProps = state => ({
  UI: state.UI
})

export default connect(mapStateToProps)(withStyles(styles)(FormUserDetails))
