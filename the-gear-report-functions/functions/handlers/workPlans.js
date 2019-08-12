const { stripeKey } = require('../util/key.js')
const stripe = require('stripe')(stripeKey)
const { db } = require('../util/admin')

exports.postWorkPlan = (req, res) => {

  const newWorkPlan = {
    completionDate: new Date(req.body.completionDate).toISOString(),
    allowSponsors: req.body.sponsored,
    estimatedCost: req.body.cost,
    plan: req.body.plan,
    userHandle: req.user.handle,
    userAvatarLetters: req.user.avatarLetters,
    createdAt: new Date().toISOString(), // recognized time type
    userImage: req.user.imageUrl,
    completed: false,
    alertId: req.body.alertId,
    totalPledged: 0,
    pledges: []
  } 

  db
    .collection('workPlans')
    .add(newWorkPlan)
    .then((doc) => {
      const resWorkPlan = newWorkPlan
      resWorkPlan.workPlanId = doc.id
      res.json(resWorkPlan)
    })
    .catch(() => {
      res.status(500).json({ general: 'something went wrong 500'})
    })
}

exports.getWorkPlansByAlert = (req, res) => {
  let workPlansData = []
  db
  .collection('workPlans')
  .orderBy('completionDate', 'desc')
  .where('alertId', '==', req.params.alertId)
  .get()
  .then(data => {
    data.forEach(workPlan => {
      var newWorkPlan = workPlan.data()
      newWorkPlan.id = workPlan.id
      workPlansData.push(newWorkPlan)
    })
    return res.json(workPlansData)
  })
}

exports.submitPledge = (req, res) => {

  const newPledge = {
    amount: req.body.pledgeAmount,
    userHandle: req.user.handle,
    userAvatarLetters: req.user.avatarLetters,
    createdAt: new Date().toISOString(), // recognized time type
    userImage: req.user.imageUrl,
    workPlanId: req.params.workPlanId
  }

  db
    .collection('pledges')
    .add(newPledge)
    .then(doc => {
      const resPledge = newPledge
      resPledge.pledgeId = doc.id
      res.json(resPledge)
    })
    .catch(() => {
      res.status(500).json({ general: 'something went wrong 500'})
    })
}

exports.markWorkPlanCompleted = (req, res) => {
  db
  .doc(`/workPlans/${req.params.workPlanId}`)
  .get()
  .then((doc) => {
    let newDoc = doc.data()
    let updatedPledges = newDoc.pledges

    updatedPledges.map((pledge, i) => {
      if(pledge.status === 'pledged') {
        updatedPledges[i].status = 'donated'
        stripe.invoices.update(pledge.invoiceId, {
          auto_advance: true
        }, (err, invoice) => {
          return 
        })
      } 
      return
    })
    doc.ref
      .update({ completed: true, pledges: updatedPledges })
      .then(() => {
        let batch = db.batch()
        updatedPledges.map(pledge => {
          batch.update(db.collection('invoices').doc(pledge.dbInvoiceId), { status: 'donated' })
        })
        return batch.commit().then(() => {
          res.json(updatedPledges)
        })
      })
  })
  .catch(err => {
    console.log(err);
  })
}