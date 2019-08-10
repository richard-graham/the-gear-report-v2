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
      const newInvoice = {
        invoiceId: invoice.id,
        amount: invoice.total,
        alertId: alertId,
        workPlanId: workPlanId,
        userHandle: req.user.handle,
        createdAt: new Date().toISOString()
      }

      db.collection('invoices').add(newInvoice)
      db.doc(`/workPlans/${workPlanId}`).get()
        .then((doc) => {
          let planPledges = doc.data().pledges
          let newTotalPledged = doc.data().totalPledged
          planPledges.push({
            amount: invoice.total,
            userHandle: req.user.handle,
            createdAt: new Date().toISOString()
          })
          newTotalPledged += invoice.total
          return doc.ref.update({ pledges: planPledges, totalPledged: newTotalPledged })
        })
        .then(doc => {
          const resInvoice = newInvoice
          resInvoice.invoiceId = doc.id
          
          return res.json(resInvoice)
        })
    })
  })
  .catch(err => {
    return res.json(err)
  })
}

exports.createManualInvoice = (req, res) => {

}