import {
  SET_LOCATION,
  RESET_LOCATION,
  REMOVE_SEARCHED
} from '../types'
import { isCragOrUnder } from '../../util/functions'


export const updateLocation = (location, zoom) => dispatch => {
  isCragOrUnder(location.type) ? location.cragOrUnder = true : location.cragOrUnder = false
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

export const removeSearched = () => dispatch => {
  dispatch({ type: REMOVE_SEARCHED })
}
