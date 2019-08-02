import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import DatePickerApp from './DatePicker'
//Mui
import { withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'


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
            <Typography variant='subtitle1' style={{ paddingBottom: 5 }}>Please select expected completion date</Typography>
            <DatePickerApp 
              className={classes.datePick} 
              selectedDate={selectedDate}
              handleDateChange={this.handleDateChange}  
            />
            <br />
            <br />
            {/* <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend">Allow Sponsorship?</FormLabel>
                <FormControlLabel
                  control={
                    <Checkbox checked={yesSponsor} onChange={this.handleYesSponsor} />
                  }
                  label='Yes'
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={noSponsor} onChange={this.handleNoSponsor} />
                  }
                  label='No'
                />
            </FormControl> */}
            {/* <RadioGroup> */}
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
            {/* </RadioGroup> */}
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
    paddingBottom: 20
  },
  datePick: {
    minWidth: 150,
    minHeight: 150
  },
  radio: {
    padding: 0,
    paddingTop: 6,
    paddingBottom: 6,
    paddingRight: 6
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(WorkPlanDialog))
