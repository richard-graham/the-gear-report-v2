const { stripeKey } = require('../util/key.js')
const stripe = require('stripe')(stripeKey)

const charge = (token, amount, currency) => {
  return stripe.charges.create({
    amount: amount,
    currency: currency,
    source: token,
    description: 'test'
  })
}

exports.postPayment = (req, res) => {
  
  return stripe.charges.create({
    amount: req.body.amount,
    source: req.body.token,
    currency: req.body.currency,
    description: 'test'
  })
  .then(data => {
    res.send(data)
  })
  .catch(err => {
    res.send(err)
  })
};

exports.getPayment = (req, res) => {
  res.send({ message: 'Hello Stripe checkout server!', timestamp: new Date().toISOString() })
}
