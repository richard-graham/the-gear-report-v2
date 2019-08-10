import React, { Component } from 'react'
//Mui
import { withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress';

export class PaymentConfirmation extends Component {
  render() {
    const { 
      open, 
      handleCancel, 
      onSubmit, 
      classes,
      pledged,
      status,
      loading
    } = this.props
    return (
      <Dialog open={open} onClose={handleCancel} className={classes.dialog}>
        <DialogTitle id="alert-dialog-title">{"Are you sure you want to continue?"}</DialogTitle>
          {loading && <CircularProgress className={classes.progress} size={50} />}
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
            This will charge your stored card 
            ${pledged}{status === 'Current' && ' when this workplan is completed'}.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancel} color="primary">
              Cancel
            </Button>
            <Button onClick={onSubmit} color="primary" autoFocus>
              Continue
            </Button>
          </DialogActions>
      </Dialog>
    )
  }
}

const styles = {
  container: {
    padding: 20
  },
  progress: {
    position: 'absolute',
    top: '40%',
    left: '40%'
  }
}

export default withStyles(styles)(PaymentConfirmation)