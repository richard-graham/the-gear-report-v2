const { admin, db } = require('../util/admin')
const { stripeKey } = require('../util/key.js')
const stripe = require('stripe')(stripeKey)
const config = require('../util/config')

const firebase = require('firebase')
firebase.initializeApp(config)

const { validateSignUpData, validateLoginData, reduceUserDetails } = require('../util/validators')

// SIGN UP

exports.signup = (req, res) => {

  let avatarLetters = ''
  req.body.handle.split(' ').map((word) => {
    avatarLetters += word.charAt(0).toUpperCase()
  })

  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.body.handle,
    city: req.body.city ? req.body.city : '',
    bio: req.body.bio ? req.body.bio : '',
    phone: req.body.phone ? req.body.phone : '',
    avatarLetters: avatarLetters,
    subAreas: {
      '879850311': {
        name: 'Maungarei Springs',
        id: '879850311'
      }
    },
    stripe: {
      stripeId: '',
      hasPaymentMethod: false
    },
    invoices: []
  }

  const { valid, errors } = validateSignUpData(newUser)

  if (!valid) return res.status(400).json(errors)

  const noImg = 'no-image.png'

  let token, userId
  db
    .doc(`/users/${newUser.handle}`)
    .get()
    .then(doc => {
      if(doc.exists){ // user handle is taken
        return res.status(400).json({ handle: 'This name is already taken' })
      } else {
        // create user
        return firebase
                .auth()
                .createUserWithEmailAndPassword(newUser.email, newUser.password)
      }
    })
    .then(data => {
      // request token
      userId = data.user.uid
      return data.user.getIdToken()
    })
    .then(idToken => {
      token = idToken
      const userCredentials = {
        handle: newUser.handle,
        email: newUser.email,
        phone: newUser.phone,
        createdAt: new Date().toISOString(),
        userId: userId,
        imageUrl: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${noImg}?alt=media`,
        city: newUser.city,
        avatarLetters: newUser.avatarLetters,
        bio: newUser.bio,
        subAreas: newUser.subAreas,
        stripe: newUser.stripe,
        invoices: newUser.invoices
      }
      return db.doc(`/users/${newUser.handle}`).set(userCredentials)
    })
    .then(() => {
      // create stripe cust and add stripeId to user

      stripe.customers.create({
        description: userId,
        // source: "tok_visa", // obtained with Stripe.js
        email: newUser.email,
      }, function(err, customer) {
        newUser.stripe.stripeId = customer.id
        db.doc(`/users/${newUser.handle}`)
          .update({ stripe: { stripeId: customer.id, hasPaymentMethod: false }  })
          .then(() => {
            return res.json({ token: token, user: newUser })
          })
      })
    })
    .catch(err => {
      console.error(err)
      if(err.code === 'auth/email-already-in-use'){
        return res.status(400).json({ email: 'Email is already in use' })
      } else if(err.code === 'auth/weak-password'){
        return res.status(400).json({ password: 'Weak password please try again' })
      } else {
        return res.status(500).json({ general: 'Something went wrong please try again' })
      }
    })
}

// LOGIN

exports.login = (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password
  }

  const { valid, errors } = validateLoginData(user)

  if (!valid) return res.status(400).json(errors)
  if(Object.keys(errors).length > 0) return res.status(400).json(errors)

  // Login
  console.log(user);
  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then(data => {
      // request user token
      return data.user.getIdToken()
    })
    .then(token => {
      // send it to the front
      return res.json({ token })
    })
    .catch(err => {
      console.error(err)
      return res.status(403).json({ general: 'Wrong credentials, please try again' })
    })
}

// EDIT USER

exports.addUserDetails = (req,res) => {
  let userDetails = reduceUserDetails(req.body)
  db.doc(`/users/${req.user.handle}`)
    .update(userDetails)
    .then(() => {
      return res.json({ message: 'Details added successfully'} )
    })
    .catch(err => {
      console.error(err)
      return res.status(500).json({ error: err.code })
    })
}

// GET OWN USER DETAILS

exports.getAuthenticatedUser = (req, res) => {
  let userData = {}
  // console.log(req.user.handle);
  db.doc(`/users/${req.user.handle}`)
    .get()
    .then(doc => {
      if (doc.exists){
        userData.credentials = doc.data()
        return db.collection('likes').where('userHandle', '==', req.user.handle).get()
      }
    })
    .then(data => {
      console.log(data);
      userData.likes = []
      data.forEach(doc => {
        userData.likes.push(doc.data())
      })
      return db.collection('notifications')
               .where('recipient', '==', req.user.handle)
               .orderBy('createdAt', 'desc')
               .limit(10)
               .get()
    })
    .then(data => {
      userData.notifications = []
      data.forEach(doc => {
        userData.notifications.push({
          recipient: doc.data().recipient,
          sender: doc.data().sender,
          createdAt: doc.data().createdAt,
          alertId: doc.data().alertId,
          type: doc.data().type,
          read: doc.data().read,
          notificationId: doc.id
        })
      })
      return res.json(userData)
    })
    .catch(err => {
      console.error(err)
      return res.status(500).json({ error: err.code })
    })
}

// GET ANY USERS DETAILS

exports.getUserDetails = (req, res) => {
  let userData = {}
  db.doc(`/users/${req.params.handle}`)
    .get()
    .then(doc => {
      if(doc.exists){
        userData.user = doc.data()
        return db.collection('alerts').where('userHandle', '==', req.params.handle).orderBy('createdAt', 'desc').get()
      } else {
        return res.status(404).json({ error: 'User not found' })
      }
    })
    .then((data) => {
      userData.alerts = []
      data.forEach(alert => {
        userData.alerts.push({
          body: alert.data().body,
          createdAt: alert.data().createdAt,
          userHandle: alert.data().userHandle,
          userImage: alert.data().userImage,
          likeCount: alert.data().likeCount,
          commentCount: alert.data().commentCount,
          alertId: alert.id
        })
      })
      return res.json(userData)
    })
    .catch(err => {
      console.error(err)
      return res.status(500).json({ error: err.code })
    })
}

// UPLOAD IMAGE

exports.uploadImage = (req, res) => {
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
      return res.status(400).json({ error: 'Wrong file type submitted' })
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
    // convert to low res image
    const im = require('imagemagick')
    im.resize({
      srcPath: imageToBeUploaded.filepath,
      dstPath: imageToBeUploaded.filepath,
      width: 180
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
      // next construct the image url to add it to the user
      const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media`
      db.doc(`/users/${req.user.handle}`).update({ imageUrl: imageUrl }) // Note: req.user comes from the FBAuth middleware in index.js
      return imageUrl
    })
    .then((response) => {
      return res.json({ 
        message: 'Image uploaded successfully',
        response: response
      })
    })
    .catch(err => {
      console.error(err)
      return res.status(500).json({ error: err.code })
    })
  })
  busboy.end(req.rawBody)
}

// MARK NOTIFICATIONS AS READ

exports.markNotificationsRead = (req, res) => {
  // when user opens notification dropdown send server arr of id's  -> notifications just seen
  // and mark as read
  let batch = db.batch() // batch allows you to update multiple documents
  console.log(req.body);
  req.body.forEach(notificationId => {
    const notification = db.doc(`/notifications/${notificationId}`)
    batch.update(notification, { read: true })
  })
  batch.commit()
  .then(() => {
    res.json({ message: 'Notifications marked as read' })
  })
  .catch(err => {
    console.error(err)
    return res.status(500).json({ error: err.code })
  })
}

// SUBSCRIBE TO CRAG
exports.subscribeToCrag = (req, res) => {
  db
    .doc(`/users/${req.user.handle}`)
    .get()
    .then(doc => {
      if(doc.exists){
        return doc.data()
      } else {
        return res.status(404).json({ error: 'User not found' })
      }
    })
    .then(data => {
      var subAreas = data.subAreas
      if(subAreas[req.body.id]) return res.json({ error: `${req.body.name} already subscribed to`})
      subAreas[req.body.id] = { name: req.body.name, id: req.body.id }
      db
        .doc(`/users/${req.user.handle}`)
        .update({ subAreas: subAreas })
    })
    .then(() => {
      return res.json({ message: `${req.body.name} added successfully` })
    })
    .catch(err => {
      console.log(err);
    })
}

// UNSUBSCRIBE FROM CRAG
exports.unsubscribeFromCrag = (req, res) => {
  db
    .doc(`/users/${req.user.handle}`)
    .get()
    .then(doc => {
      if(doc.exists){
        return doc.data()
      } else {
        return res.status(404).json({ error: 'User not found' })
      }
    })
    .then(data => {
      var subAreas = data.subAreas
      if(!subAreas[req.body.id]) return res.json({ error: `${req.body.name} not subscribed to`})
      delete subAreas[req.body.id]
      db
        .doc(`/users/${req.user.handle}`)
        .update({ subAreas: subAreas })
    })
    .then(() => {
      return res.json({ message: `${req.body.name} removed successfully` })
    })
    .catch(err => {
      console.log(err);
    })
}

exports.getInvoicesByUser = (req, res) => {
  db.collection('invoices')
    .where('userHandle', '==', req.user.handle)
    .get()
    .then(docs => {
      let invoices = []
      docs.forEach(doc => invoices.push(doc.data()))
      res.send(invoices)
    })
    .catch(err => {
      console.log(err);
    })
}