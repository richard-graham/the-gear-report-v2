import React, { Component, Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import { loginUser } from '../../../redux/actions/userActions'
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
    this.props.loginUser(userData)
    this.props.history.goBack()
  }

  render() {
    const { classes, UI: { loading, errors } } = this.props
    const { email, password } = this.state
    return (
      <div className={classes.formContainer}>
        <Paper className={classes.loginPaper}>
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
          {errors && <Fragment><br /><Typography className={classes.formError}>{errors.general}</Typography></Fragment>}
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
          <Typography style={{ marginBottom: 30}}>Don't have an account? Click <Link to={'/signup'}>here</Link></Typography>
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
  }
})

const mapStateToProps = state => ({
  UI: state.UI
})

export default connect(mapStateToProps, { loginUser })(withStyles(styles)(Login))
