import {
  SET_LOCATION,
  RESET_LOCATION
} from '../types'

export const updateLocation = (location, zoom) => dispatch => {
  location.zoom = zoom
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