import React, { Component } from 'react'
//Mui
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

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
      <div className={classes.container}>
        <Paper className={classes.paper}>
        <Typography variant='h2' className={classes.header}>Welcome to the Gear Report</Typography>
          <TextField 
            variant='outlined'
            className={classes.textField}
            placeholder='Enter Your Occupation'
            label='Occupation' 
            onChange={handleChange('occupation')}
            defaultValue={values.occupation}
          />
          <br />
          <TextField 
            variant='outlined'
            className={classes.textField}
            placeholder='Enter Your City'
            label='City' 
            onChange={handleChange('city')}
            defaultValue={values.city}
          />
          <br />
          <TextField 
            variant='outlined'
            className={classes.textField}
            placeholder='Enter Your Bio'
            multiline
            rows="3"
            label='Bio' 
            onChange={handleChange('bio')}
            defaultValue={values.bio}
          />
          <br />
          <TextField 
            variant='outlined'
            className={classes.textField}
            placeholder="A short summary of work you've done at crags in the past if any..."
            multiline
            rows="3"
            label='Experience' 
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
        </Paper>
      </div>
    )
  }
}

const styles = theme => ({
  button: {
    margin: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 6
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

export default withStyles(styles)(FormPersonalDetails)
