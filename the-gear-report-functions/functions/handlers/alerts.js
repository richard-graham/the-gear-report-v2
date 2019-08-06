const { db, admin } = require('../util/admin')

const config = require('../util/config')


exports.getAllAlerts = (req, res) => {
  db
    .collection('alerts')
    .orderBy('createdAt', 'desc')
    .get()
    .then(data => {
      let alerts = []
      data.forEach(doc => { // doc = a document reference
        alerts.push({
          alertId: doc.id,
          body: doc.data().body,
          userHandle: doc.data().userHandle,
          createdAt: doc.data().createdAt,
          userImage: doc.data().userImage,
          likeCount: doc.data().likeCount,
          commentCount: doc.data().commentCount,
          title: doc.data().title,
          sponsored: doc.data().sponsored,
          resolved: doc.data().resolved
        }) // data() is a function that returns the data within the document
      })
      return res.json(alerts)
    })
    .catch(err => {
      res.status(500).json({ error: 'something went wrong '}) // note: changes status code from 200
      console.error(err)
    })
}

exports.getRecentAlerts = (req, res) => {
  db
    .collection('alerts')
    .orderBy('createdAt', 'desc')
    .limit(15)
    .get()
    .then(data => {
      let alerts = []
      data.forEach(doc => { // doc = a document reference
        alerts.push({
          alertId: doc.id,
          body: doc.data().body,
          userHandle: doc.data().userHandle,
          createdAt: doc.data().createdAt,
          userImage: doc.data().userImage,
          likeCount: doc.data().likeCount,
          commentCount: doc.data().commentCount,
          title: doc.data().title,
          sponsored: doc.data().sponsored,
          resolved: doc.data().resolved
        }) // data() is a function that returns the data within the document
      })
      return res.json(alerts)
    })
    .catch(err => {
      res.status(500).json({ error: 'something went wrong '}) // note: changes status code from 200
      console.error(err)
    })
}

exports.postOneAlert = (req, res) => {
  if (req.body.body.trim() === '') {
    return res.status(400).json({ general: 'Body must not be empty' })
  } else if (req.body.title.trim() === '') {
    return res.status(400).json({ general: 'Title must not be empty' })
  } else if (req.body.locations.length === 0){
    return res.status(400).json({ general: 'Crag must be assigned to Alert'})
  }

  const newAlert = {
    body: req.body.body,
    title: req.body.title,
    images: req.body.images,
    userHandle: req.user.handle,
    userAvatarLetters: req.user.avatarLetters,
    createdAt: new Date().toISOString(), // recognized time type
    userImage: req.user.imageUrl,
    likeCount: 0,
    commentCount: 0,
    sponsored: false,
    resolved: false,
    locations: req.body.locations,
    locationNames: req.body.locationNames
  } 

  db
    .collection('alerts')
    .add(newAlert)
    .then((doc) => {
      const resAlert = newAlert
      resAlert.alertId = doc.id
      res.json(resAlert)
    })
    .catch(() => {
      res.status(500).json({ general: 'something went wrong 500'}) // note: changes status code from 200
    })
}

exports.getAlert = (req, res) => {
  let alertData = {}
  db.doc(`/alerts/${req.params.alertId}`).get() // returns doc
  .then(doc => {
    if(!doc.exists){
      return res.status(404).json({ error: 'Alert not found' })
    } 
    // returns alert 
    alertData = doc.data()
    alertData.alertId = doc.id
    
    return db.collection('comments')
             .orderBy('createdAt', 'desc')
             .where('alertId', '==', req.params.alertId)
             .get()
  })
  .then(data => {
    alertData.comments = []
    data.forEach(comment => {
      var newComment = comment.data()
      newComment.id = comment.id
      alertData.comments.push(newComment)
    })
    return res.json(alertData)
  })
  .catch(err => {
    console.error(err)
    res.status(500).json({ error: err.code })
  })
}

exports.getAlertsByUser = (req, res) => {
  db.collection(`/alerts`).where('userHandle', '==', req.params.userHandle)
    .get()
    .then(docs => {
      let alerts = []
      if(docs.length < 1){
        return res.status(404).json({ error: 'No alerts found for this user' })
      }
      docs.forEach(doc => {
        let newAlert = doc.data()
        newAlert.alertId = doc.id
        alerts.push(newAlert)
      })
      return res.json(alerts)
    })
    .catch(err => {
      console.error(err)
      res.status(500).json({ error: err.code })
    })
}

exports.getAlertsByLocations = (req, res) => {
  db.collection('/alerts').where('locations', 'array-contains', req.params.location)
    .get()
    .then(docs => {
      let alerts = []
      docs.forEach(doc => {
        let newAlert = doc.data()
        newAlert.alertId = doc.id
        alerts.push(newAlert)
      })
      return res.json(alerts)
    })
    .catch(err => {
      console.error(err)
      res.status(500).json({ error: err.code })
    })
}

exports.commentOnAlert = (req, res) => {
  if(req.body.body.trim() === '') return res.status(400).json({ comment: 'Must not be empty' })
  // build comment
  const newComment = {
    body: req.body.body,
    createdAt: new Date().toISOString(),
    alertId: req.params.alertId,
    userHandle: req.user.handle, // from middleware 
    userImage: req.user.imageUrl,
    likeCount: 0
  }
  // check alert exists
  db.doc(`/alerts/${req.params.alertId}`)
    .get()
    .then(doc => {
      if(!doc.exists){
        return res.status(404).json({ comment: 'Alert not found' })
      }
      return doc.ref.update({ commentCount: doc.data().commentCount + 1 })
    })
    .then(() => {
      db.collection('comments').add(newComment).then(doc => {
        res.json({
          ...newComment,
          id: doc.id
        })
      })
    })
    .catch(err => {
      console.error(err)
      return res.status(500).json({ error: 'Something went wrong' })
    })
}

// UPLOAD IMAGE

exports.uploadAlertImage = (req, res) => {
  const BusBoy = require('busboy')
  const path = require('path') // default package
  const os = require('os')
  const fs = require('fs')

  let imageFileName
  let imageToBeUploaded = {} 

  const busboy = new BusBoy({ headers: req.headers })

  busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {

    // validation

    if(mimetype !== 'image/jpeg' && mimetype !== 'image/png'){
      return res.status(400).json({ error: 'Wrong file type submitted, use .jpg or .png' })
    }

    // img.png or my.img.png -> split string by dots -> select last value
    const imageExtension = filename.split('.')[filename.split('.').length -1]
    // 783645987326.png
    imageFileName = `${Math.round(Math.random()*1000000000)}.${imageExtension}`
    const filepath = path.join(os.tmpdir(), imageFileName)
    imageToBeUploaded = { filepath, mimetype}
    file.pipe(fs.createWriteStream(filepath))
  })
  busboy.on('finish', () => {
    //resize image
    const im = require('imagemagick')
    im.resize({
      srcPath: imageToBeUploaded.filepath,
      dstPath: imageToBeUploaded.filepath,
      width: 300,
      height: 500
    })

    admin.storage().bucket().upload(imageToBeUploaded.filepath, {
      resumable: false,
      metadata: {
        metadata: {
          contentType: imageToBeUploaded.mimetype
        }
      }
    })
    .then(() => {
      const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media`
      return res.json({ message: 'Image uploaded successfully', url: imageUrl.toString() })
    })
    .catch(err => {
      console.error(err)
      return res.status(500).json({ error: err.code })
    })
  })
  busboy.end(req.rawBody)
}

exports.likeAlert = (req, res) => {
  // check to see if alert already liked & check if alert exists
  const likeDocument = db.collection('likes')
                        .where('userHandle', '==', req.user.handle)
                        .where('alertId', '==', req.params.alertId)
                        .limit(1) // will return arr with 1x doc
  const alertDocument = db.doc(`/alerts/${req.params.alertId}`)

  let alertData

  alertDocument
    .get()
    .then(doc => {
      if(doc.exists){
        alertData = doc.data()
        alertData.alertId = doc.id
        return likeDocument.get()
      } else {
        return res.status(404).json({ error: 'Alert not found' })
      }
    })
    .then(data => {
      if(data.empty){
        return db.collection('likes').add({
          alertId: req.params.alertId,
          userHandle: req.user.handle
        })
        // cant do a return then handle the promise in the next .then() because if it's
        // not empty it may go through so we need to nest the then inside the if block
        .then(() => {
          alertData.likeCount++
          return alertDocument.update({ likeCount: alertData.likeCount })
        })
        .then(() => {
          return res.json(alertData) // success!
        })
      } else { // user has already liked this alert
        return res.status(400).json({ error: 'Alert already liked' })
      }
    })
    .catch(err => {
      console.error(err)
      res.status(500).json({ error: err.code })
    })
}

exports.likeComment = (req, res) => {
  // check if comment already liked and that comment exists
  const likeDocument = db.collection('likes')
                        .where('userHandle', '==', req.user.handle)
                        .where('commentId', '==', req.params.commentId)
                        .limit(1) // will return arr with 1x doc
  const commentDocument = db.doc(`/comments/${req.params.commentId}`)
  let commentData

  commentDocument
    .get()
    .then(doc => {
      if(doc.exists){
        commentData = doc.data()
        commentData.commentId = doc.id
        return likeDocument.get()
      } else {
        return res.status(404).json({ error: 'Comment not found' })
      }
    })
    .then(data => {
      if(data.empty){
        return db.collection('likes').add({
          commentId: req.params.commentId,
          userHandle: req.user.handle
        })
        // cant do a return then handle the promise in the next .then() because if it's
        // not empty it may go through so we need nest the then inside the if block
        .then(() => {
          commentData.likeCount++
          return commentDocument.update({ likeCount: commentData.likeCount })
        })
        .then(() => {
          return res.json(commentData) // success!
        })
      } else { // user has already liked this comment
        return res.status(400).json({ error: 'Comment already liked' })
      }
    })
    .catch(err => {
      console.error(err)
      res.status(500).json({ error: err.code })
    })
}

exports.unlikeComment = (req, res) => {
  // check to see if alert already liked & check if alert exists
   const likeDocument = 
   db
    .collection('likes')
    .where('userHandle', '==', req.user.handle)
    .where('commentId', '==', req.params.commentId)
   .limit(1) // will return arr with 1x doc
const commentDocument = db.doc(`/comments/${req.params.commentId}`)
let commentData

commentDocument
  .get()
  .then(doc => {
    if(doc.exists){
      commentData = doc.data()
      commentData.commentId = doc.id
      return likeDocument.get()
    } else {
      return res.status(404).json({ error: 'Comment not found' })
    }
  })
  .then(data => {
    if(data.empty){
      return res.status(400).json({ error: 'Comment not liked' })
    } else { 
      return db
        .doc(`/likes/${data.docs[0].id}`)
        .delete()
        .then(() => {
          commentData.likeCount--
          return commentDocument.update({ likeCount: commentData.likeCount })
        })
        .then(() => {
          res.json(commentData)
        })
    }
  })
  .catch(err => {
    console.error(err)
    res.status(500).json({ error: err.code })
  })
}

exports.unlikeAlert = (req, res) => {
  // check to see if alert already liked & check if alert exists
  const likeDocument = db.collection('likes')
                        .where('userHandle', '==', req.user.handle)
                        .where('alertId', '==', req.params.alertId)
                        .limit(1) // will return arr with 1x doc
  const alertDocument = db.doc(`/alerts/${req.params.alertId}`)

  let alertData

  alertDocument
    .get()
    .then(doc => {
      if(doc.exists){
        alertData = doc.data()
        alertData.alertId = doc.id
        return likeDocument.get()
      } else {
        return res.status(404).json({ error: 'Alert not found' })
      }
    })
    .then(data => {
      if(data.empty){
        return res.status(400).json({ error: 'Alert not liked' })
      } else { 
        return db
          .doc(`/likes/${data.docs[0].id}`)
          .delete()
          .then(() => {
            alertData.likeCount--
            return alertDocument.update({ likeCount: alertData.likeCount })
          })
          .then(() => {
            res.json(alertData)
          })
      }
    })
    .catch(err => {
      console.error(err)
      res.status(500).json({ error: err.code })
    })
}

exports.deleteAlert = (req, res) => {
  const document = db.doc(`/alerts/${req.params.alertId}`)
  document.get()
    .then(doc => {
      if(!doc.exists){
        return res.status(404).json({ error: 'Alert not found' })
      }
      if(doc.data().userHandle !== req.user.handle){
        return res.status(403).json({ error: 'Unauthorized' })
      } else {
        return document.delete()
      }
    })
    .then(() => {
      res.json({ message: 'Alert deleted successfully' })
    })
    .catch(err => {
      console.error(err)
      return res.status(500).json({ error: err.code })
    })
}

exports.deleteComment = (req, res) => {
  const document = db.doc(`/comments/${req.params.commentId}`)
  document.get()
    .then(doc => {
      if(!doc.exists){
        return res.status(404).json({ error: 'Comment not found'})
      }
      if(doc.data().userHandle !== req.user.handle){
        return res.status(403).json({ error: 'Unauthorized' })
      } else {
        doc.ref.update({ commentCount: doc.data().commentCount - 1 })
        document.delete()
      }
    })
    .then(() => {
      res.json({ message: 'Comment deleted successfully' })
    })
    .catch(err => {
      console.log(err)
      return res.status(500).json({ error: err.code })
    })
}