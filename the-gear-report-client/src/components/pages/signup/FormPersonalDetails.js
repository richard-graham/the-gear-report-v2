import React, { Component, Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

export class FormPersonalDetails extends Component {

  continue = e => {
    e.preventDefault()
    this.props.nextStep()
  }

  back = e => {
    e.preventDefault()
    this.props.prevStep()
  }

  render() {
    const { values, handleChange, classes } = this.props

    return (
      <Fragment>
        <TextField 
          placeholder='Enter Your Occupation'
          label='Occupation' 
          onChange={handleChange('occupation')}
          defaultValue={values.occupation}
        />
        <br />
        <TextField 
          placeholder='Enter Your City'
          label='City' 
          onChange={handleChange('city')}
          defaultValue={values.city}
        />
        <br />
        <TextField 
          placeholder='Enter Your Bio'
          label='Bio' 
          onChange={handleChange('bio')}
          defaultValue={values.bio}
        />
        <br />
        <Button 
          color="secondary"
          className={classes.button}
          onClick={this.back}
          variant="contained"
        >Back</Button>
        <Button 
          color="primary"
          className={classes.button}
          onClick={this.continue}
          variant="contained"
        >Continue</Button>
      </Fragment>
    )
  }
}

const styles = {
  button: {
    margin: 15
  }
}

export default withStyles(styles)(FormPersonalDetails)
