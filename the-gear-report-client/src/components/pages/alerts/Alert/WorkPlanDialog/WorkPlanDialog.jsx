import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import DatePickerApp from './DatePicker'
//Mui
import { withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Radio from '@material-ui/core/Radio'

export class WorkPlanDialog extends Component {

  state = {
    open: false,
    selectedDate: new Date(),
    yesSponsor: true,
    noSponsor: false
  }

  handleDialogClose = () => {
    this.setState({ open: false })
  }

  handleButtonClick = () => {
    this.setState({ open: true })
  }

  handleDateChange = (val) => {
    this.setState({ selectedDate: val })
  }

  handleYesSponsor = () => {
    this.setState({ 
      yesSponsor: true,
      noSponsor: false
    })
  }

  handleNoSponsor = () => {
    this.setState({ 
      yesSponsor: false,
      noSponsor: true
    })
  }

  render() {
    const {
      classes
    } = this.props

    const {
      open,
      selectedDate,
      yesSponsor,
      noSponsor
    } = this.state
    return (
      <Fragment>
        <Button
          color='primary'
          size='small'
          variant='outlined'
          className={classes.workButton}
          onClick={this.handleButtonClick}
        >Create Work Plan</Button>
        <Dialog
          open={open}
          onClose={this.handleDialogClose}
        >
          <div className={classes.dialogContainer}>
            <Typography variant='h6' className={classes.dialogTitle}>Create Work Plan</Typography>
            <Typography variant='subtitle1' className={classes.dialogSubtitle}>Please select expected completion date</Typography>
            <DatePickerApp 
              className={classes.datePick} 
              selectedDate={selectedDate}
              handleDateChange={this.handleDateChange}  
            />
            <Typography variant='subtitle1' className={classes.dialogSubtitle} >Allow Sponsorship</Typography>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Radio 
                checked={yesSponsor} 
                onChange={this.handleYesSponsor} 
                className={classes.radio} 
              /><Typography>Yes</Typography>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Radio 
                checked={noSponsor} 
                onChange={this.handleNoSponsor} 
                className={classes.radio} 
              /><Typography>No</Typography>
            </div>
          </div>
        </Dialog>
      </Fragment>
    )
  }
}

const styles = {
  dialogContainer: {
   padding: 24
  },
  dialogTitle: {
    marginBottom: 5
  },
  datePick: {
    minWidth: 150,
    minHeight: 150
  },
  radio: {
    padding: 0,
    paddingTop: 4,
    paddingBottom: 4,
    paddingRight: 6
  },
  dialogSubtitle: {
    marginTop: 10,
    marginBottom: 3
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(WorkPlanDialog))
