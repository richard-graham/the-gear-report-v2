import { 
  SET_USER_LOCATION, 
  SET_USER_COUNTRY
} from '../types'

export const updateUserLocation = (position) => (dispatch) => {
    dispatch({ 
      type: SET_USER_LOCATION,
      payload: {
        ...position
      }
    })
}

export const updateUserCountry = (country) => (dispatch) => {
  dispatch({
    type: SET_USER_COUNTRY,
    payload: country
  })
}