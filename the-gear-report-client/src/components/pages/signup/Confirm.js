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


export class FormPersonalDetails extends Component {

  continue = e => {
    e.preventDefault()
    // Process Form
    this.props.nextStep()
  }

  back = e => {
    e.preventDefault()
    this.props.prevStep()
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.setState({
      loading: true
    })
    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      bio: this.state.bio,
      city: this.state.city,
    }
    this.props.signupUser(newUserData, this.props.history)
  }


  render() {
    const { values: { firstName, lastName, email, occupation, city, bio }, UI: { loading }, classes, handleSubmit, errors } = this.props

    return (
      <div className={classes.formContainer}>
        <Paper className={classes.formPaper}>
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
              primary='Occupation'
              secondary={ occupation }
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
          <br />
          {errors && (
              Object.values(errors).map(error => <Typography variant='h2' className={classes.signupError}>{error}</Typography>)
              )}
          <Button 
            color='secondary'
            className={classes.signupButton}
            onClick={this.back}
            variant="contained"
          >Back</Button>
          <Button 
            color='primary'
            className={classes.signupButton}
            onClick={handleSubmit}
            variant="contained"
            disabled={loading}
          >Submit
          {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
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
  }
})

const mapStateToProps = state => ({
  UI: state.UI
})

export default connect(mapStateToProps)(withStyles(styles)(FormPersonalDetails))
