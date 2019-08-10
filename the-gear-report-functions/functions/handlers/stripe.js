const { stripeKey } = require('../util/key.js')
const stripe = require('stripe')(stripeKey)
const { db } = require('../util/admin')

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
      customer: req.user.stripe.stripeId
    }
  )
  .then(paymentMethod => {
    stripe.customers.update(
      req.user.stripe.stripeId, 
      { invoice_settings: {
        default_payment_method: paymentMethod.id
      }}
    )
  })
  .then(() => {
    db.doc(`/users/${req.user.handle}`).update({ 'stripe.hasPaymentMethod': true })
  })
  .then((data) => {
    return res.json(data)
  })
  .catch(err => {
    res.json({ err: err })
  })
}

exports.createAutoInvoice = (req, res) => {
  const { stripeId, pledged, workPlanId, alertId } = req.body
  stripe.invoiceItems.create({
    customer: stripeId,
    amount: pledged * 100,
    currency: 'nzd',
    description: `pledge for work plan no: ${workPlanId}`,
  }, (err, invoiceItem) => {
    stripe.invoices.create({
      customer: stripeId,
      auto_advance: true,
      collection_method: 'charge_automatically',
      metadata: {
        workPlanId: workPlanId,
        alertId: alertId
      },
    }, (err, invoice) => {
      db
        .doc(`/users/${req.user.handle}`)
        .get()
        .then(doc => {
          if(!doc.exists){
            return res.status(404).json({ error: 'User not found' })
          } 
          const invoiceRef = {
            id: invoice.id,
            amount: invoice.total,
            alertId: alertId,
            workPlanId: workPlanId,
          }
          let invoices = doc.data().invoices
          invoices.push(invoiceRef)
            
          doc.ref.update({ invoices: invoices })
        })
        .then(() => {
          return res.json(invoiceRef)
        })
    })
  })
}

exports.createManualInvoice = (req, res) => {

}