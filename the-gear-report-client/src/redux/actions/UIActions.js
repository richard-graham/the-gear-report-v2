import {
  SET_LOCATION
} from '../types'

export const updateLocation = (location, zoom) => dispatch => {
  location.zoom = zoom
  dispatch({
    type: SET_LOCATION,
    payload: location
  })
}