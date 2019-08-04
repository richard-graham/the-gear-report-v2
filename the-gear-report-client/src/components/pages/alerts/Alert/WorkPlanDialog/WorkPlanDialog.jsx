import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import DatePickerApp from './DatePicker'
import { createAssignment, setError } from '../../../../../redux/actions/assignmentActions.js'
import history from '../../../../../util/history'
import moment from 'moment'
//Mui
import { withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Radio from '@material-ui/core/Radio'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormControl from '@material-ui/core/FormControl'
import DialogActions from '@material-ui/core/DialogActions'

export class WorkPlanDialog extends Component {

  state = {
    open: false,
    selectedDate: new Date(),
    yesSponsor: true,
    noSponsor: false,
    cost: '',
    plan: ''
  }

  handleDialogClose = () => {
    this.setState({ 
      open: false,
      selectedDate: new Date(),
      yesSponsor: true,
      noSponsor: false,
      cost: '',
      plan: '',
      planError: false,
      costError: false
     })
  }

  handleButtonClick = () => {
    if(!this.props.authenticated){
      history.push('/login')
    } else {
      this.setState({ open: true })
    }
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

  handleCostChange = () => (e) => {
    this.setState({ cost: e.target.value })
  }
  handlePlanChange = () => (e) => {
    this.setState({ plan: e.target.value })
  }

  handleSubmit = (selectedDate, yesSponsor, cost, plan) => {
    if(yesSponsor && cost === ''){
      this.setState({ costError: true })
      this.props.setError('Please add estimated cost')
    } else if ( plan === '' ) {
      this.setState({ planError: true })
      this.props.setError('Please add plan')
    } else {
      this.props.createAssignment(
        selectedDate.toISOString(), 
        yesSponsor, 
        cost, 
        plan,
        this.props.alertId
      )
      this.renderButton = false
      this.handleDialogClose()
    }
  }

  render() {
    const {
      classes,
    } = this.props

    const {
      open,
      selectedDate,
      yesSponsor,
      noSponsor,
      cost,
      plan,
      planError,
      costError
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
            <Typography variant='subtitle1' className={classes.dialogSubtitle}>Select expected completion date</Typography>
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
                color='primary'
              /><Typography>Yes</Typography>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Radio 
                checked={noSponsor} 
                onChange={this.handleNoSponsor} 
                className={classes.radio} 
              /><Typography>No</Typography>
            </div>
            {yesSponsor && 
            <FormControl fullWidth className={classes.estimated} >
              <Typography variant='subtitle1' className={classes.dialogSubtitle}>Estimated Cost</Typography>
              <Input
                value={this.state.cost}
                type='number'
                onChange={this.handleCostChange()}
                error={costError}
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
              />
            </FormControl>}
            <FormControl fullWidth className={classes.estimated} >
              <Typography variant='subtitle1' className={classes.dialogSubtitle}>Plan to resolve alert</Typography>
              <Input
                value={this.state.plan}
                onChange={this.handlePlanChange()}
                error={planError}
                multiline
                rows={3}
              />
            </FormControl>
            <DialogActions className={classes.actions}>
              <Button 
                color="primary"
                onClick={this.handleDialogClose}
              >
                Cancel
              </Button>
              <Button 
                color="primary" 
                type='submit'
                onClick={() => this.handleSubmit(selectedDate, yesSponsor, cost, plan)}
              >
                Submit
              </Button>
            </DialogActions>
          </div>
        </Dialog>
      </Fragment>
    )
  }
}

const styles = {
  dialogContainer: {
   padding: 24,
   minWidth: 450
  },
  dialogTitle: {
    marginBottom: 20
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
  },
  estimated: {
    marginTop: 12
  },
  submit: {
    marginTop: 25
  },
  cancel: {
    marginTop: 25,
    marginLeft: 50
  },
  actions: {
    margin: 0,
    marginTop: 20
  }
}

const mapStateToProps = (state) => ({
  alertId: state.data.alert.alertId,
  authenticated: state.user.authenticated,
})

const mapDispatchToProps = {
  createAssignment,
  setError
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(WorkPlanDialog))
