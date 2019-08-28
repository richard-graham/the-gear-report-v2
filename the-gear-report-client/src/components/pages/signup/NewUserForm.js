import React, { Component } from 'react'
import FormUserDetails from './FormUserDetails'
import FormPersonalDetails from './FormPersonalDetails'
import AddCc from '../../stripe/saveCc/AddCc'
import Confirm from './Confirm'
import { connect } from 'react-redux'
import { signupUser, clearErrors } from '../../../redux/actions/userActions'
//Mui
// import Stepper from '@material-ui/core/Stepper';
// import Step from '@material-ui/core/Step';
// import StepLabel from '@material-ui/core/StepLabel';
// import { withStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';

export class NewUserForm extends Component {
  state = {
    step: 1,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    bio: '',
    dialogOpen: false,
    client: ''
  }

  capitalise = (name) => {
    return name.charAt(0).toUpperCase() + name.substring(1)
  }

  componentWillUnmount = () => {
    this.props.clearErrors()
  }

  // Proceed to the next step

  nextStep = () => {
    const { step } = this.state
    this.setState({
      step: step + 1
    })
  }

  // go back to pervious step

  prevStep = () => {
    const { step } = this.state
    this.setState({
      step: step - 1
    })
  } 

  // Handle Field Change

  handleChange = input => e => {
    this.setState({
      [input]: e.target.value
    })
  }

  handleSubmit = (event, addCc) => {
    const {
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
      bio,
      city,
      phone
    } = this.state
    const { history, signupUser } = this.props
    event.preventDefault()
    const newUserData = {
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
      bio,
      city,
      phone,
      handle: `${this.capitalise(firstName)} ${this.capitalise(lastName)}`
    }
    addCc ? signupUser(newUserData) : signupUser(newUserData, history)
    addCc && this.nextStep()
  }

  render() {
    const { step, firstName, lastName, email, phone, city, bio } = this.state
    const values = { firstName, lastName, email, city, bio, phone }
    const { errors } = this.props
    switch(step) {
      case 1:
        return (
            <FormUserDetails 
              nextStep={this.nextStep}
              handleChange={this.handleChange}
              values={values}
              errors={errors}
            />
        )
      case 2:
        return (
          <FormPersonalDetails 
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
            errors={errors}
          />
        )
      case 3:
        return (
          <Confirm
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            values={values} 
            handleSubmit={this.handleSubmit}
          />
        )
      case 4:
        return (
          <AddCc />
        )
      default:
        return <h1>Error 'Step' is undefined</h1>
    }
    
  }
}

const mapStateToProps = state => ({
  errors: state.UI.errors.general,
  credentials: state.user.credentials
})

const mapDispatchToProps = {
  signupUser,
  clearErrors
}

export default connect(mapStateToProps, mapDispatchToProps)(NewUserForm)
