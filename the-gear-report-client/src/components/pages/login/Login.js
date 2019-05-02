import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import { loginUser } from '../../../redux/actions/userActions'
import { connect } from 'react-redux'
//Mui
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Paper from '@material-ui/core/Paper'


export class Login extends Component {
  state = {
    email: '',
    password: ''
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.setState({
      loading: true
    })
    const userData = {
      email: this.state.email,
      password: this.state.password,
    }
    this.props.loginUser(userData, this.props.history)
  }

  render() {
    const { classes, UI: { loading } } = this.props
    const { email, password } = this.state
    return (
      <div className={classes.formContainer}>
        <Paper className={classes.formPaper}>
        <Typography variant='h2' className={classes.formHeader}>Welcome to the Gear Report</Typography>
          <TextField 
            variant='outlined'
            className={classes.signupTextField}
            label='Email' 
            onChange={this.handleChange}
            defaultValue={email}
            name='email'
          />
          <br />
          <TextField 
            variant='outlined'
            className={classes.signupTextField}
            label='Password' 
            onChange={this.handleChange}
            defaultValue={password}
            name='password'
            type='password'
          />
          <br />
          <Button 
            color='primary'
            className={classes.signupMultiButton}
            onClick={this.handleSubmit}
            variant="contained"
            disabled={loading}
          >
          Submit
          {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
          </Button>
        </Paper>
      </div>
    )
  }
}

const styles = theme => ({
  ...theme
})

const mapStateToProps = state => ({
  UI: state.UI
})

export default connect(mapStateToProps, { loginUser })(withStyles(styles)(Login))
