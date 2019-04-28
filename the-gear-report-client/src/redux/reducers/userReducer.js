import { 
  SET_USER_LOCATION,
  SET_USER_COUNTRY,
  SET_USER, 
  SET_AUTHENTICATED, 
  SET_UNAUTHENTICATED,
  LOADING_USER,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  MARK_NOTIFICATIONS_READ
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
      case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true
      }
    case SET_UNAUTHENTICATED:
      return initialState
    case SET_USER:
      return {
        authenticated: true,
        loading: false,
        ...action.payload
      }
    case LOADING_USER:
      return {
        ...state,
        loading: true
      }
    case LIKE_SCREAM:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            userHandle: state.credentials.handle,
            screamId: action.payload.screamId
          }
        ]
      }
    case UNLIKE_SCREAM:
      return {
        ...state,
        likes: state.likes.filter((like) => like.screamId !== action.payload.screamId)
      }
    case MARK_NOTIFICATIONS_READ:
     state.notifications.forEach(note => note.read = true)
     return {
       ...state
     }
    default:
      return state
  }
}