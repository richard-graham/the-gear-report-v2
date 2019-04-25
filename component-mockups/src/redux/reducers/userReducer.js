import { 
  SET_LOCATION
} from '../types'

const initialState = {
  authenticated: false,
  loading:false,
  credentials: {},
  likes: [],
  notifications: [],
  location: {
    lat: -30.209985,
    lng: 145.095043,
    haveUsersLocation: false,
    zoom: 4
  }
}

export default function(state = initialState, action){
  switch(action.type){
    case SET_LOCATION:
      return {
        ...state,
        location: action.payload
      }
    default:
      console.log(state);
      return state
  }
}