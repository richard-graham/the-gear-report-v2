import React, { Component, Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import { loginUser, clearErrors } from '../../../redux/actions/userActions'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
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

  componentWillUnmount = () => {
    this.props.clearErrors()
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const userData = {
      email: this.state.email,
      password: this.state.password,
    }
    this.props.loginUser(userData, this.props.history)
  }

  render() {
    const { classes, UI: {  errors }, loading } = this.props
    const { email, password } = this.state
    return (
      <div className={classes.formContainer}>
        <Paper className={classes.loginPaper}>
          <form>
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
            {errors.general && 
            <Fragment>
              <br />
              {errors.general.map((error, i) => {
                return (
                  <Typography className={classes.formError} key={i}>{error}</Typography>
                )
              })}
            </Fragment>}
            <Button 
              color='primary'
              className={classes.loginSubmitButton}
              onClick={this.handleSubmit}
              variant="contained"
              disabled={loading}
              type='submit'
            >
            Submit
            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
            </Button>
            <Typography style={{ marginBottom: 30}}>Don't have an account? Click <Link to={'/signup'}>here</Link></Typography>
          </form>
        </Paper>
      </div>
    )
  }
}

const styles = theme => ({
  ...theme,
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  loginSubmitButton: {
    marginBottom: 24,
    marginTop: 8
  }
})

const mapStateToProps = state => ({
  UI: state.UI,
  loading: state.user.loading
})

const mapDispatchToProps = {
  loginUser,
  clearErrors
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login))
