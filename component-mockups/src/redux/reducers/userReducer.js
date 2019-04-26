import { 
  SET_USER_LOCATION,
  SET_USER_COUNTRY
} from '../types'

const initialState = {
  authenticated: false,
  loading:false,
  credentials: {},
  likes: [],
  notifications: [],
  lat: -30.209985,
  lng: 145.095043,
  haveUsersLocation: false,
  zoom: 4,
  countryName: ''
}

export default function(state = initialState, action){
  switch(action.type){
    case SET_USER_LOCATION:
      return {
        ...state,
        ...action.payload
      }
    case SET_USER_COUNTRY:
      return {
        ...state,
        ...action.payload 
      }
    default:
      return state
  }
}