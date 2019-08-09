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

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = async (e) => {
    e.preventDefault()
      let currency = 'NZD'
      axios.post('/stripe/intent/create')
      .then(success => {
        let secret = success.data.client_secret
        this.props.stripe.createPaymentMethod('card', {billing_details: {name: 'Jenny Rosen'}})
          .then(({ paymentMethod }) => {
            this.props.stripe.handleCardSetup(secret, <CardElement />, { payment_method_data: { paymentMethod } } )
              .then(({ setupIntent }) => {
                axios.post(`/stripe/paymentMethods/add`, { paymentMethod: setupIntent.payment_method })
                  .then(data => {
                    console.log(data);
                  })
                
              })
          })
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
        onSubmit={(e) => this.handleSubmit(e)}
      >
        <CardElement className={classes.cardEl} />
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

  },
  cardEl: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 10,
    marginBottom: 10,
    border: '1px solid black',
    borderRadius: 5,
    padding: 7,
    width: '75%'
  }
}

export default withStyles(styles)(injectStripe(CheckoutForm))