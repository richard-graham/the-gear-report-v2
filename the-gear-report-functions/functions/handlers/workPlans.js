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