import React, { Component } from 'react'
import Checkout from '../../stripe/saveCc/Checkout'
//Mui
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Indigo from '@material-ui/core/colors/indigo'


class AddCc extends Component {

  render() {
    const { classes } = this.props

    return (
      <div className={classes.formContainer}>
        
        <Paper className={classes.signupPaper}>
          <Typography variant='h2' className={classes.formHeader}>Add Credit Card Details</Typography>
          <br />
          <Typography>Here is some stuff about how we won't do anything illegal</Typography>
          <div className={classes.overlay}>
            <Checkout className={classes.checkout} />
          </div>
         
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
  checkout: {
    maxWidth: 200
  },
  overlay: {

  }
})

export default withStyles(styles)(AddCc)
