import {
  SET_LOCATION
} from '../types'

export const updateLocation = location => dispatch => {
  dispatch({
    type: SET_LOCATION,
    payload: location
  })
}