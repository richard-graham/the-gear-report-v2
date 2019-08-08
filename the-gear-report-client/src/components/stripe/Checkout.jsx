import React, { Component } from 'react'
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
import STRIPE_PUBLISHABLE from './constants/stripe';
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

class Checkout extends Component{
  render() {
    const { 
      name, 
      description, 
      amount,
      credentials
    } = this.props

    return(
      <StripeCheckout 
        name={name}
        description={description}
        amount={fromDollarToCent(amount)}
        token={onToken(amount, description)}
        currency={CURRENCY}
        stripeKey={STRIPE_PUBLISHABLE}
        email={credentials.email}
        
      >
        
      </StripeCheckout>
    )
  }
} 

const mapStateToProps = state => ({
  credentials: state.user.credentials
})

export default connect(mapStateToProps)(Checkout)