import { 
  SET_LOCATION
} from '../types'

export const getUserLocation = (position) => (dispatch) => {
  console.log('hey');
    dispatch({ 
      type: SET_LOCATION,
      payload: {
        ...position
      }
    })
}

