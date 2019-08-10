import React, { Component } from 'react'
import Dialog from '@material-ui/core/Dialog'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

export class PaymentConfirmation extends Component {
  render() {
    const { open, handleCancel, onSubmit } = this.props
    return (
      <Dialog open={open} onClose={handleCancel} >
        <Typography>Are you sure?</Typography>
        <Button onClick={onSubmit}>Yes</Button>
        <Button onClick={handleCancel}>No</Button>
      </Dialog>
    )
  }
}

export default PaymentConfirmation