const { db } = require('../util/admin')

exports.postAssignment = (req, res) => {

  const newAssignment = {
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
    .collection('assignments')
    .add(newAssignment)
    .then((doc) => {
      const resAssignment = newAssignment
      resAssignment.assignmentId = doc.id
      res.json(resAssignment)
    })
    .catch(() => {
      res.status(500).json({ general: 'something went wrong 500'})
    })
}

exports.getAssignmentByAlert = (req, res) => {
  let assignmentsData = []
  db
  .collection('assignments')
  .orderBy('completionDate', 'desc')
  .where('alertId', '==', req.params.alertId)
  .get()
  .then(data => {
    data.forEach(assignment => {
      var newAssignment = assignment.data()
      newAssignment.id = assignment.id
      assignmentsData.push(newAssignment)
    })
    return res.json(assignmentsData)
  })
}