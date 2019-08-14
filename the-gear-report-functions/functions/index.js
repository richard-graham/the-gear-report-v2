const functions = require('firebase-functions');
const app = require('express')()
const FBAuth = require('./util/fbAuth')

const cors = require('cors')
app.use(cors())

const { db } = require('./util/admin')

const { 
  getAllAlerts, 
  getRecentAlerts,
  postOneAlert, 
  getAlert, 
  commentOnAlert, 
  uploadAlertImage,
  likeAlert, 
  unlikeAlert,
  deleteAlert,
  getAlertsByUser,
  getAlertsByLocations,
  likeComment,
  unlikeComment,
  deleteComment
} = require('./handlers/alerts')

const { 
  signup, 
  login, 
  uploadImage, 
  addUserDetails, 
  getAuthenticatedUser,
  getUserDetails,
  markNotificationsRead,
  subscribeToCrag,
  unsubscribeFromCrag,
  getInvoicesByUser
 } = require('./handlers/users')

 const {
   getLocationData,
   getNode,
   updateSearchLocation,
   getChildrenAndAncestors,
   getChildren,
   textCompletion
 } = require('./handlers/tc')

 const {
   postWorkPlan,
   getWorkPlansByAlert,
   submitPledge,
   markWorkPlanCompleted
 } = require('./handlers/workPlans')
 

 const {
  postPayment,
  getPayment,
  createIntent,
  addPaymentMethod,
  createInvoice,
  markUncollectible
 } = require('./handlers/stripe')

// Alert routes
app.get('/alerts/all', getAllAlerts)
app.get('/alerts/recent', getRecentAlerts)
app.get('/alert/:alertId', getAlert)
app.get('/alerts/:userHandle', getAlertsByUser)
app.get('/alerts/location/:location', getAlertsByLocations) 
app.post('/alert', FBAuth, postOneAlert)
app.post('/alert/add/image', FBAuth, uploadAlertImage)
app.post('/alert/:alertId/comment', FBAuth, commentOnAlert)
app.get('/alert/:alertId/like', FBAuth, likeAlert)
app.get('/comment/:commentId/like', FBAuth, likeComment)
app.get('/comment/:commentId/unlike', FBAuth, unlikeComment)
app.get('/alert/:alertId/unlike', FBAuth, unlikeAlert)
app.delete('/alert/:alertId', FBAuth, deleteAlert)
app.delete('/comment/:commentId', FBAuth, deleteComment)

// User routes
app.post('/signup', signup)
app.post('/login', login)
app.post('/user/image', FBAuth, uploadImage)
app.post('/user', FBAuth, addUserDetails)
app.get('/user', FBAuth, getAuthenticatedUser)
app.get('/user/:handle', getUserDetails)
app.post('/notifications', FBAuth, markNotificationsRead)
app.post('/subscribe/crag', FBAuth, subscribeToCrag)
app.post('/unsubscribe/crag', FBAuth, unsubscribeFromCrag)
app.get('/user/invoices/get', FBAuth, getInvoicesByUser)

// The Crag routes
app.get('/tc/location/:location', getLocationData)
app.get('/tc/node/:nodeID', getNode)
app.get('/tc/search/location/:id', updateSearchLocation)
app.get('/tc/node/location/:nodeID/relatives', getChildrenAndAncestors)
app.get('/tc/node/location/:nodeID/children', getChildren)
app.get('/tc/search/textcompletion/:input', textCompletion)

// Work Plan routes
app.post('/workPlan', FBAuth, postWorkPlan)
app.get('/workPlan/alert/:alertId', getWorkPlansByAlert)
app.post('/workPlan/pledge/:workPlanId', FBAuth, submitPledge)
app.post('/workPlan/completed/:workPlanId', FBAuth, markWorkPlanCompleted)

// Stripe Routes
app.get('/stripe/payment', getPayment)
app.post('/stripe/payment', postPayment)
app.post('/stripe/intent/create', createIntent)
app.post('/stripe/paymentMethods/add', FBAuth, addPaymentMethod)
app.post('/stripe/invoice', FBAuth, createInvoice)
app.post('/stripe/invoice/uncollectible', markUncollectible)

exports.api = functions.region('us-central1').https.onRequest(app) 
// exports.api = functions.region('europe-west1').https.onRequest(app)

exports.createNotificationOnLike = functions.region('us-central1').firestore.document('likes/{id}')
  .onCreate((snapshot) => {
    return db.doc(`/alerts/${snapshot.data().alertId}`).get()
    .then(doc => {
      if(doc.exists && doc.data().userHandle !== snapshot.data().userHandle){ // don't send a notification is liking or commenting on their own post
        return db.doc(`/notifications/${snapshot.id}`).set({
          createdAt: new Date().toISOString(),
          recipient: doc.data().userHandle,
          sender: snapshot.data().userHandle,
          type: 'alertLike',
          read: false,
          alertId: doc.id
        })
      }
    })
    .catch(err => {
      console.error(err)
    })
  })

  exports.createNotificationOnCommentLike = functions.region('us-central1').firestore.document('likes/{id}')
  .onCreate((snapshot) => {
    return db.doc(`/comments/${snapshot.data().commentId}`).get()
    .then(doc => {
      if(doc.exists && doc.data().userHandle !== snapshot.data().userHandle){ // don't send a notification is liking or commenting on their own post
        return db.doc(`/notifications/${snapshot.id}`).set({
          createdAt: new Date().toISOString(),
          recipient: doc.data().userHandle,
          sender: snapshot.data().userHandle,
          type: 'commentLike',
          read: false,
          commentId: doc.id,
          alertId: doc.data().alertId
        })
      }
    })
    .catch(err => {
      console.error(err)
    })
  })

exports.deleteNotificationOnUnlike = functions.region('us-central1').firestore.document('likes/{id}')
  .onDelete((snapshot) => {
    return db.doc(`/notifications/${snapshot.id}`)
      .delete()
      .catch(err => {
        console.error(err)
        return
      })
  })

exports.createNotificationOnComment = functions.region('us-central1').firestore.document('comments/{id}')
  .onCreate((snapshot) => {
    return db.doc(`/alerts/${snapshot.data().alertId}`).get()
    .then(doc => {
      if(doc.exists && doc.data().userHandle !== snapshot.data().userHandle){
        return db.doc(`/notifications/${snapshot.id}`).set({
          createdAt: new Date().toISOString(),
          recipient: doc.data().userHandle,
          sender: snapshot.data().userHandle,
          type: 'comment',
          read: false,
          alertId: doc.id
        })
      }
    })
    .catch(err => {
      console.error(err)
      return // no need to return as function is a database trigger
    })
  })

exports.onUserImageChange = functions.region('us-central1').firestore.document('users/{userId}')
  .onUpdate((change) => {
    console.log(change.before.data());
    console.log(change.after.data());
    // changing multiple docs so need to use batch
    if(change.before.data().imageUrl !== change.after.data().imageUrl){
    console.log('image has changed');
    let batch = db.batch()
    return db.collection('alerts').where('userHandle', '==', change.before.data().handle).get()
      .then((data) => {
        data.forEach((doc) => { // doc refers to each document the user has created
          const alert = db.doc(`/alerts/${doc.id}`)
          batch.update(alert, { userImage: change.after.data().imageUrl })
        })
        return batch.commit()
      })
    } else {
      return true
    }
  })

exports.onAlertDelete = functions.region('us-central1').firestore.document('alerts/{alertId}')
  .onDelete((snapshot, context) => { // contest has the params that we have in the url
    const alertId = context.params.alertId
    let batch = db.batch()
    return db.collection('comments').where('alertId', '==', alertId).get() // find comments
      .then(data => {
        data.forEach(doc => {
          batch.delete(db.doc(`/comments/${doc.id}`)) // delete comments
        })
        return db.collection('likes').where('alertId', '==', alertId).get() // find likes
      })
      .then(data => {
        data.forEach(doc => {
          batch.delete(db.doc(`/likes/${doc.id}`)) // delete likes
        })
        return db.collection('notifications').where('alertId', '==', alertId).get() //etc etc
      })
      .then(data => {
        data.forEach(doc => {
          batch.delete(db.doc(`/notifications/${doc.id}`))
        })
        return batch.commit()
      })
      .catch(err => {
        console.error(err)
      })
  })