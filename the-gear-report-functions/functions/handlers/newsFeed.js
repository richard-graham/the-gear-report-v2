const { db } = require('../util/admin')

exports.getNewsFeed = (req, res) => {
  db
    .collection('newsFeed')
    .orderBy('createdAt', 'desc')
    .limit(30)
    .get()
    .then(data => {
      let newsFeed = []

      data.forEach(doc => {
        let feedItem = doc.data()
        feedItem.id = doc.id
        newsFeed.push(feedItem)
      })

      return res.json(newsFeed)
    })
    .catch(err => {
      console.log(err);
    })
}

exports.getNewsFeedFromItem = (req, res) => {

  const startingPoint = req.params.newsItem // starting point is the createdAt date of the last newsFeed item on the client


  db
    .collection('newsFeed')
    .orderBy('createdAt', 'desc')
    .startAt(startingPoint)
    .limit(21)
    .get()
    .then(data => {
      let newsFeed = []

      data.forEach(doc => {
        let feedItem = doc.data()
        feedItem.id = doc.id
        newsFeed.push(feedItem)
      })

      newsFeed.shift() //removes first item in array

      return res.json(newsFeed)
    })
    .catch(err => {
      console.log(err);
    })
}