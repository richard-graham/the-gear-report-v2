import {
  SET_LOCATION
} from '../types'

export const updateLocation = location => dispatch => {
  console.log(location);
  dispatch({
    type: SET_LOCATION,
    payload: location
  })
}