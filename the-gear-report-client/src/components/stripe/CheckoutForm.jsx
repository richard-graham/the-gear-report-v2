import React, { Component } from 'react'
import { CardElement, injectStripe } from 'react-stripe-elements'
import axios from 'axios'
//Mui
import { withStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'

class CheckoutForm extends Component {

  state = {
    name: ''
  }

  fromDollarToCent = amount => amount * 100;


  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = async (e) => {
    e.preventDefault()

      let { token } = await this.props.stripe.createToken({ name: this.state.name })
      let amount = this.fromDollarToCent(this.props.pledge)
      let currency = 'NZD'

      console.log({ token, amount});
      axios.post('/stripe/intent', {
       token: token.id,
       amount,
       currency
      })
      .then(success => {
        console.log(success);
      })
      .catch(err => {
        console.log(err);
      });
  
  }

  render() {
    const { classes } = this.props
    return (
      <form 
        className={classes.form}
        onSubmit={this.handleSubmit}
      >
        <FormControl className={classes.formControl} fullWidth>
          <InputLabel htmlFor="component-simple">Name</InputLabel>
          <Input 
            name={'name'} 
            id="component-simple" 
            value={this.state.name} 
            onChange={this.handleChange} 
          />
        </FormControl>
        <br />
        <br />
        <FormControl className={classes.formControl} fullWidth>
          <CardElement  />
        </FormControl>
        <br />
        <Button type={'submit'} variant='contained' className={classes.submitButton}>
          Submit
        </Button>
      </form>
    )
  }
}

const styles = {
  form: {
    minWidth: '75%'
  },
  submitButton: {

  }
}

export default withStyles(styles)(injectStripe(CheckoutForm))