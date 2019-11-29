import React, { Component } from 'react'
import CheckoutForm from './CheckoutForm'
//Mui
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'



class AddCc extends Component {

  render() {
    const { classes } = this.props
    return (
      <div className={classes.formContainer}>
        
        <Paper className={classes.signupPaper}>
          <Typography variant='h2' className={classes.formHeader}>Add Credit Card Details</Typography>
          <br />
          <Typography>Here is some stuff about how we won't do anything illegal</Typography>
          <CheckoutForm />
         
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

export default withStyles(styles)(AddCc)
