import React, { Component, Fragment } from 'react'
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
    const { values: { firstName, lastName, email, occupation, city, bio }, UI: { loading }, classes, handleSubmit } = this.props

    return (
      <div className={classes.container}>
        <Paper className={classes.paper}>
          <Typography variant='h2' className={classes.header}>Welcome to the Gear Report</Typography>
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
          <Button 
            color='secondary'
            className={classes.button}
            onClick={this.back}
            variant="contained"
          >Back</Button>
          <Button 
            color='primary'
            className={classes.button}
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
  text: {
    margin: theme.spacing.unit * 2,
    // width: '60%',
  },
  container: {
    width: '100%',
    heigh: '100%',
    display: 'flex',
    flexDirection: 'column'
  }
})

const mapStateToProps = state => ({
  UI: state.UI
})

export default connect(mapStateToProps)(withStyles(styles)(FormPersonalDetails))
