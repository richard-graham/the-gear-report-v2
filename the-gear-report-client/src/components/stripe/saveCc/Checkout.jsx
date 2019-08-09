import React, { Component } from 'react'
import { StripeProvider, Elements } from 'react-stripe-elements';
import STRIPE_PUBLISHABLE from '../constants/stripe';
import CheckoutForm from './CheckoutForm'

export class Checkout extends Component{
  render() {
    return(
      <StripeProvider apiKey={STRIPE_PUBLISHABLE}>
        <Elements>
          <CheckoutForm />  
        </Elements>
      </StripeProvider>
    )
  }
} 

export default Checkout