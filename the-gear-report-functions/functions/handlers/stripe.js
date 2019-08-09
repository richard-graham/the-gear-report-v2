const { stripeKey } = require('../util/key.js')
const stripe = require('stripe')(stripeKey)

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

exports.createIntent = (req, res) => {
  return stripe.setupIntents.create({  })
  .then(data => {
    res.send(data)
  })
  .catch(err => {
    res.send(err)
  })
}

exports.getPayment = (req, res) => {
  res.send({ message: 'Hello Stripe checkout server!', timestamp: new Date().toISOString() })
}

exports.addPaymentMethod = (req, res) => {
  return stripe.paymentMethods.attach(
    req.body.paymentMethod,
    {
      customer: req.user.stripeId
    }
  )
  .then(data => {
    res.json(data)
  })
  .catch(err => {
    res.json({ err: err })
  })
}
