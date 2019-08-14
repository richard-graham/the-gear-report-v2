const tcKey = require('../util/key')

const getLocationData = (req, res) => {
  fetch(`https://brendan.thecrag.com/api/index/detail/${req.params.location}?withdata=NodeID,ParentID,Name,NumberRoutes,AreaType,Point&to=arealeaf&key=${tcKey.tcKey}`)
    .then(response => {

      return response.json()
    })
    .then(data => {
      console.log(data);
      const resObj = {}
      resObj.parent = {
        id: data.data[0][0],
        parentID: data.data[0][1],
        name: data.data[0][2],
        numberRoutes: data.data[0][3],
        type: data.data[0][4],
        geo: data.data[0][5]
      }
      data.data.map((loc) => {
        if (loc[4] !== "G" && loc[3] > 0) {
          const locationObj = {
            id: loc[0],
            parentID: loc[1],
            name: loc[2],
            numberRoutes: loc[3],
            type: loc[4],
            geo: loc[5]
          }    
          if (resObj[locationObj.parentID] === undefined) {
            resObj[locationObj.parentID] = {}
          }
          return resObj[locationObj.parentID][loc[2]] = locationObj
        }
        return null
      })
      // Sort alphabetically for UI
      const resOrdered = {}
      Object.keys(resObj).forEach(entry => {
        const sorted = {}
        Object.keys(resObj[entry]).sort().forEach(key => {
        sorted[key] = resObj[entry][key]
        })
        resOrdered[entry] = sorted
      })

      res.send(resOrdered)
    })
    .catch(err => {
      console.log(err);
    })
}

const getNode = (req, res) => {
  fetch(`https://brendan.thecrag.com/api/node/id/${req.params.nodeID}?show=info,children,ancestors&key=${tcKey.tcKey}`)
  .then(response => response.json())
  .then(resData => {
    res.send(resData)
  })
  .catch(err => {
    console.log(err);
  })
}

const updateSearchLocation = (req, res) => {
  fetch(`https://brendan.thecrag.com/api/node/id/${req.params.id}?show=info,children,ancestors&key=${tcKey.tcKey}`)
    .then(response => response.json())
    .then(resData => {
      res.send(resData)
    })
    .catch(err => {
      console.log(err);
    })
}

const getChildrenAndAncestors = (req, res) => {
  fetch(`https://brendan.thecrag.com/api/node/id/${req.params.nodeID}?show=children,ancestors&key=${tcKey.tcKey}`)
    .then(response => response.json())
    .then(resData => {
      res.send(resData)
    })
    .catch(err => {
      console.log(err);
    })
}

const getChildren = (req, res) => {
  fetch(`https://brendan.thecrag.com/api/node/id/${req.params.nodeID}?show=children&key=${tcKey.tcKey}`)
    .then(response => response.json())
    .then(resData => {
      res.send(resData)
    })
    .catch(err => {
      console.log(err);
    })
}

const textCompletion = (req, res) => {
  fetch(`https://brendan.thecrag.com/api/lookup/crag?search=${req.params.input}&key=${tcKey.tcKey}`)
    .then(response => response.json())
      .then(resData => {
        res.send(resData)
      })
      .catch(err => {
        console.log(err);
      })
}

module.exports = {
  getLocationData,
  getNode,
  updateSearchLocation,
  getChildrenAndAncestors,
  getChildren,
  textCompletion
}