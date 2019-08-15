import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
//Mui
import List from '@material-ui/core/List'
import ListItemText from '@material-ui/core/ListItemText'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'


export class FormPersonalDetails extends Component {

  state = {
    addCc: true
  }

  handleAddCc = () => this.setState({ addCc: true })

  handleNotAddCc = () => this.setState({ addCc: false })

  continue = e => {
    e.preventDefault()
    // Process Form
    this.props.nextStep()
  }

  back = e => {
    e.preventDefault()
    this.props.prevStep()
  }

  render() {
    const { 
      values: { 
        firstName, 
        lastName, 
        email, 
        phone, 
        city, 
        bio 
      }, 
      classes, 
      handleSubmit, 
      errors ,
      loading
    } = this.props

    return (
      <div className={classes.formContainer}>
        <Paper className={classes.signupPaper}>
          <Typography variant='h2' className={classes.formHeader}>Welcome to the Gear Report</Typography>
          <List>
            <ListItemText 
              primary='First Name'
              secondary={ firstName }
              variant='outlined'
              className={classes.text}
            />
            <ListItemText 
              primary='Last Name'
              secondary={ lastName }
              className={classes.text}
            />
            <ListItemText 
              primary='Email'
              secondary={ email }
              className={classes.text}
            />
            <ListItemText 
              primary='Phone Number'
              secondary={ phone }
              className={classes.text}
            />
            <ListItemText 
              primary='City'
              secondary={ city }
              className={classes.text}
            />
            <ListItemText 
              primary='Bio'
              secondary={ bio }
              className={classes.text}
            />
          </List>
          <div>
            <Typography>Add payment details so you can sponsor work plans?</Typography>
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.addCc}
                  onChange={this.handleAddCc}
                  value="addCc"
                  color='primary'
                />
              }
              label='Yes'
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={!this.state.addCc}
                  onChange={this.handleNotAddCc}
                  value="addCc"
                />
              }
              label='No'
            />
          </div>
          {errors.length > 0 && (
            errors.map((error, i) => <Typography key={i} variant='h2' className={classes.formError}>{error}</Typography>)
            )}
          <br />
          <Button 
            color='secondary'
            className={classes.signupButton}
            onClick={this.back}
            variant="contained"
          >Back</Button>
          <Button 
            color='primary'
            className={classes.signupButton}
            onClick={(e) => handleSubmit(e, this.state.addCc)}
            variant="contained"
            disabled={loading}
          >Submit
          {loading && <CircularProgress size={24} className={classes.submitProgress} />}
          </Button>
        </Paper>
      </div>
    )
  }
}

const styles = theme => ({
  ...theme,
  text: {
    margin: theme.spacing.unit * 2
  },
  submitProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  }
})

const mapStateToProps = state => ({
  UI: state.UI,
  errors: state.UI.errors.general,
  loading: state.user.loading
})

export default connect(mapStateToProps)(withStyles(styles)(FormPersonalDetails))
