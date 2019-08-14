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

exports.createInvoice = (req, res) => {
  const { stripeId, pledged, workPlanId, alertId, method } = req.body
  const autoAdvance = method === 'auto' ? true : false
  stripe.invoiceItems.create({
    customer: stripeId,
    amount: pledged * 100,
    currency: 'nzd',
    description: `pledge for work plan no: ${workPlanId}`,
  }, (err, invoiceItem) => {
    stripe.invoices.create({
      customer: stripeId,
      auto_advance: autoAdvance,
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
        createdAt: new Date().toISOString(),
        status: autoAdvance ? 'donated' : 'pledged'
      }

      db.collection('invoices').add(newInvoice).then(newInvoiceSnap => {
        newInvoice.dbInvoiceId = newInvoiceSnap.id
      
        db.doc(`/workPlans/${workPlanId}`).get()
          .then((doc) => {
            if(!doc.exists) return res.json({ error: 'Workplan doesnt exist', workPlanId: workPlanId })
            let planPledges = []
            doc.data().pledges && doc.data().pledges.forEach(pledge => planPledges.push(pledge))
            let newTotalPledged = doc.data().totalPledged
            planPledges.push({
              invoiceId: invoice.id,
              amount: invoice.total,
              userHandle: req.user.handle,
              createdAt: new Date().toISOString(),
              status: autoAdvance ? 'donated' : 'pledged',
              dbInvoiceId: newInvoice.dbInvoiceId
            })
            newTotalPledged += invoice.total
            return doc.ref.update({ pledges: planPledges, totalPledged: newTotalPledged })
          })
          .then((doc) => {          
            return res.json(newInvoice)
          })
        })
    })
  })
  .catch(err => {
    return res.json(err)
  })
}

exports.markUncollectible = (req, res) => {
  req.body.data.object.id ? res.sendStatus(200) : res.sendStatus(300)
  db.collection('invoices')
    .where('invoiceId', '==', req.body.data.object.id)
    .limit(1)
    .get()
    .then(docs => {
      // returns a 'collection' so need to loop to get access to doc
      docs.forEach(doc => {
        let newDoc = doc.data()
        newDoc.status = 'uncollectible'
        db.doc(`/invoices/${doc.id}`)
          .update({ status: newDoc.status })
          .then(() => {
            db.doc(`/workPlans/${newDoc.workPlanId}`)
              .get()
              .then(plan => {
                let newPlan = plan.data()
                let index
                newPlan.pledges.forEach((pledge, i) => {
                  if(pledge.dbInvoiceId === doc.id){
                    return index = i  
                  }
                })
                newPlan.pledges[index].status = 'uncollectible'
                db.doc(`/workPlans/${newDoc.workPlanId}`)
                  .update({ pledges: newPlan.pledges, totalPledged: newPlan.totalPledged -= newDoc.amount })
                  .then(() => {
                    return console.log('finished');
                  })
              })
          })
      })
    })
    .catch(err => {
      console.log(err);
    })
}