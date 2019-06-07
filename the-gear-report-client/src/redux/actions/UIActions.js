import {
  SET_LOCATION,
  RESET_LOCATION,
} from '../types'

import { getNode } from '../../util/tcCalls'

export const updateLocation = (location, zoom) => dispatch => {
  location.zoom = zoom
  // location.childIds = dispatch(updateChildIds(location.NodeID, country))
  dispatch({
    type: SET_LOCATION,
    payload: location
  })
}

export const updateSearchLocation = (id) => dispatch => {
  getNode(id)
  .then(res => {
    res.zoom = 9
    res.ParentID = res.parentID
    res.NodeID = res.id
    dispatch({
      type: SET_LOCATION,
      payload: res
    })
  })
}

export const resetLocation = () => dispatch => {
  dispatch({
    type: RESET_LOCATION
  })
}

// export const updateChildIds = (rootId, country) => dispatch => {
//   const children = []
//   const getChildren = (rootObj) => {
//     Object.entries(rootObj).forEach(entry => {
//         children.push(entry[1])
//       if (country[entry[1].NodeID]){
//         getChildren(country[entry[1].NodeID])
//       }
//     })
//   }
//   getChildren(country[rootId])
//   const childIds = []
//   children.forEach(child => {
//     childIds.push(child.NodeID)
//   })
//   return childIds
// }