import {
  SET_LOCATION,
  RESET_LOCATION,
} from '../types'

export const updateLocation = (location, zoom) => dispatch => {
  location.zoom = zoom
  location.additionalInfo = false
  dispatch({
    type: SET_LOCATION,
    payload: location
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