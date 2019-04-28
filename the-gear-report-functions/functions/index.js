const functions = require('firebase-functions');
const admin = require('firebase-admin')

admin.initializeApp()

const express = require('express')
const app = express()


app.get('/alerts', (req, res) => {
  admin
    .firestore()
    .collection('alerts')
    .get()
    .then(data => {
      let alerts = []
      data.forEach(doc => {
        alerts.push(doc.data())
      })
      return res.json(alerts)
    })
    .catch(err => {
      console.error(err)
    })
})

app.post('/alert', (req, res) => {
  if(req.method !== 'POST'){
    return res.status(400).json({ error: 'Method not allowed'})
  }
  const newAlert = {
    body: req.body.body,
    userHandle: req.body.userHandle,
    createdAt: admin.firestore.Timestamp.fromDate(new Date())
  }

  admin
    .firestore()
    .collection('alerts')
    .add(newAlert)
    .then(doc => {
      res.json({ message: `document ${doc.id} created successfully`})
    })
    .catch(err => {
      res.status(500).json({ error: 'something went wrong'})
      console.error(err)
    })
})

//https:/baseurl/api/

exports.api = functions.https.onRequest(app)