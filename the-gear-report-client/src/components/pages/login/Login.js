import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loginUser } from '../../../redux/actions/userActions'
import { withStyles } from '@material-ui/core/styles'

//Mui
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'


export class NewUserForm extends Component {

  state = {
    email: '',
    password: '',
    errors: {}
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const userData = {
      email: this.state.email,
      password: this.state.password
    } 
    this.props.loginUser(userData, this.props.history)
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    const { email, password } = this.state
    const { classes, UI: { loading, errors } } = this.props
    return (
      <div className={classes.signupContainer} >
        <Paper className={classes.signupPaper}>
          <Typography variant='h2' className={classes.loginHeader}>Welcome to the Gear Report</Typography>
          <form noValidate>
            <TextField 
              name='email'
              type='email'
              variant='outlined'
              className={classes.signupTextField}
              error={errors.email ? true : false}
              helperText={errors.email}
              label='Email' 
              onChange={this.handleChange}
              value={email}
            />
            <br />
            <TextField 
              name='password'
              type='password'
              variant='outlined'
              className={classes.signupTextField}
              error={errors.password ? true : false}
              helperText={errors.password}
              label='Password' 
              onChange={this.handleChange}
              value={password}
            />
            {errors && (
                <Typography variant='body2' className={classes.customError}>
                  {errors.general}
                </Typography>
              )}
            <br />
            <Button 
              type="submit"
              variant='contained'
              color='primary'
              className={classes.loginButton}
              disabled={loading}
              onClick={this.handleSubmit}
            >
            Login
            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
            </Button>
          </form>
        </Paper>
      </div>
    )
  }
}

const styles = (theme) => ({
  ...theme,
})

const mapStateToProps = state => ({
  UI: state.UI
})

export default connect(mapStateToProps, { loginUser })(withStyles(styles)(NewUserForm))
