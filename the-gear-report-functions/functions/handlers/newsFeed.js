const { db } = require('../util/admin')

exports.getNewsFeed = (req, res) => {
  db
    .collection('newsFeed')
    .orderBy('createdAt', 'desc')
    .limit(20)
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

  const startingPoint = req.params.newsItem
  console.log(startingPoint);

  db
    .collection('newsFeed')
    .orderBy('createdAt', 'desc')
    .startAt('id', startingPoint)
    // .limit(20)
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