import React, { Component } from 'react'
import axios from 'axios';
import { StripeProvider, Elements } from 'react-stripe-elements';
import STRIPE_PUBLISHABLE from '../constants/stripe';
import CheckoutForm from './CheckoutForm'
import { connect } from 'react-redux'


const CURRENCY = 'NZD';

const fromDollarToCent = amount => amount * 100;

const successPayment = data => {
  alert('Payment Successful');
};

const errorPayment = data => {
  alert('Payment Error');
};

const onToken = (amount, description) => token =>
  axios.post('/stripe/payment',
    {
      description,
      source: token.id,
      currency: CURRENCY,
      amount: fromDollarToCent(amount)
    })
    .then(successPayment)
    .catch(errorPayment);

export class Checkout extends Component{
  render() {
    const { pledge } = this.props
    return(
      <StripeProvider apiKey={STRIPE_PUBLISHABLE}>
        <Elements>
          <CheckoutForm />  
        </Elements>
      </StripeProvider>
    )
  }
} 

const mapStateToProps = state => ({
  credentials: state.user.credentials
})

export default connect(mapStateToProps)(Checkout)