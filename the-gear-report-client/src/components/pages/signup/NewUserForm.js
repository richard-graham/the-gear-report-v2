import React, { Component } from 'react'
import FormUserDetails from './FormUserDetails'
import FormPersonalDetails from './FormPersonalDetails'
import Confirm from './Confirm'
import { connect } from 'react-redux'
import { signupUser } from '../../../redux/actions/userActions'

export class NewUserForm extends Component {
  state = {
    step: 1,
    firstName: '',
    lastName: '',
    email: '',
    occupation: '',
    city: '',
    bio: '',
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

  // componentWillReceiveProps(nextProps){
  //   if(nextProps.UI.errors){
  //     this.setState({ errors: nextProps.UI.errors })
  //   }
  // }

  handleSubmit = (event) => {
    console.log(this.state);
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
      handle: `${this.state.firstName} ${this.state.lastName}`
    }
    this.props.signupUser(newUserData, this.props.history)
  }

  render() {
    const { step, firstName, lastName, email, occupation, city, bio } = this.state
    const values = { firstName, lastName, email, occupation, city, bio }
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
            errors={errors}
          />
        )
      default:
        return <h1>Error 'Step' is undefined</h1>
    }
    
  }
}

const mapStateToProps = state => ({
  errors: state.UI.errors
})

export default connect(mapStateToProps, { signupUser })(NewUserForm)
