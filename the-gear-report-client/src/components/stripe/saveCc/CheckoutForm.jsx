import React, { Component } from 'react'
import { CardElement, injectStripe } from 'react-stripe-elements'
import axios from 'axios'
import { connect } from 'react-redux'
import { createMessage, createError, hasPaymentType } from '../../../redux/actions/stripeActions'
//Mui
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Indigo from '@material-ui/core/colors/indigo'
import CircularProgress from '@material-ui/core/CircularProgress'

class CheckoutForm extends Component {

  state = {
    name: '',
    loading: false
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = async (e) => {
    this.setState({ loading: true })
    e.preventDefault()
      axios.post('/stripe/intent/create')
      .then(success => {
        let secret = success.data.client_secret
        this.props.stripe.createPaymentMethod('card', {billing_details: {name: 'Jenny Rosen'}})
          .then(({ paymentMethod }) => {
            this.props.stripe.handleCardSetup(secret, <CardElement />, { payment_method_data: { paymentMethod } } )
              .then(({ setupIntent }) => {
                axios.post(`/stripe/paymentMethods/add`, { paymentMethod: setupIntent.payment_method })
                  .then(() => {
                    this.setState({ loading: false })
                    this.props.createMessage('Card added successfully')
                    this.props.hasPaymentType()
                  })
              })
          })
      })
      .catch(err => {
        createError('Something went wrong')
      });
  }

  render() {
    const { classes } = this.props
    const { loading } = this.state
    return (
      <form 
        className={classes.form}
        onSubmit={(e) => this.handleSubmit(e)}
      >
        <div className={classes.cardBackground} >
          <CardElement className={classes.cardEl} />
        </div>
        
        <br />
        <Button 
          type={'submit'} 
          variant='contained' className={classes.submitButton}
          color='primary'
          disabled={loading}
        >
          Submit
          {loading && <CircularProgress size={24} className={classes.submitProgress} />}
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
    padding: 10,
    minWidth: '75%',

  },
  cardBackground: {
    backgroundColor: Indigo[50],
    width: '75%',
    margin: '0px auto'
  },
  submitProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  }
}

const mapDispatchToProps = {
  createMessage,
  createError,
  hasPaymentType
}

export default connect(null, mapDispatchToProps)(withStyles(styles)(injectStripe(CheckoutForm)))