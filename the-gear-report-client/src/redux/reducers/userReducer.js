import { 
  SET_USER_LOCATION,
  SET_USER, 
  SET_NEW_USER,
  SET_AUTHENTICATED, 
  SET_UNAUTHENTICATED,
  LOADING_USER,
  LIKE_ALERT,
  UNLIKE_ALERT,
  MARK_NOTIFICATIONS_READ,
  LIKE_COMMENT,
  UNLIKE_COMMENT,
  STOP_LOADING_USER,
  LOADING_USER_IMAGE,
  SET_USER_IMAGE,
  SET_HAS_PAY_TYPE,
} from '../types'

const initialState = {
  authenticated: false,
  loading:false,
  credentials: {
    loadingImage: false,
    city: '',
    handle: '',
    email: '',
    userId: '',
    bio: '',
    imageUrl: '',
    createdAt: '',
    avatarLetters: '',
    stripe: {
      stripeId: '',
      hasPaymentMethod: false
    },
    subAreas: [],
    invoices: []
  },
  likes: [],
  notifications: [],
  lat: -30.209985,
  lng: 145.095043,
}

const logoutState = {
  authenticated: false,
  loading:false,
  credentials: {},
  likes: [],
  notifications: []
}

export default function(state = initialState, action){
  switch(action.type){
    case SET_USER_LOCATION:
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
      return {
        ...state,
        ...logoutState
      }
    case SET_USER:
      return {
        ...state,
        ...action.payload,
        authenticated: true,
        loading: false
      }
    case SET_NEW_USER:
        return {
          ...state,
          authenticated: true,
          loading: false,
          credentials: {
            ...action.payload
          }
        }
    case LOADING_USER:
      return {
        ...state,
        loading: true
      }
    case STOP_LOADING_USER:
      return {
        ...state,
        loading: false
      }
    case LOADING_USER_IMAGE: 
      return {
        ...state,
        credentials: {
          ...state.credentials,
          loadingImage: true
        }
      }
    case SET_USER_IMAGE:
      return {
        ...state,
        credentials: {
          ...state.credentials,
          loadingImage: false,
          imageUrl: action.payload
        }
      }
    case LIKE_ALERT:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            userHandle: state.credentials.handle,
            alertId: action.payload.alertId
          }
        ]
      }
    case UNLIKE_ALERT:
      return {
        ...state,
        likes: state.likes.filter((like) => like.alertId !== action.payload.alertId)
      }
    case MARK_NOTIFICATIONS_READ:
     state.notifications.forEach(note => note.read = true)
     return {
       ...state
     }
    case LIKE_COMMENT:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            userHandle: state.credentials.handle,
            commentId: action.payload.commentId
          }
        ]
      }
    case UNLIKE_COMMENT:
      return {
        ...state,
        likes: state.likes.filter(like => like.commentId !== action.payload.commentId)
      }
    case SET_HAS_PAY_TYPE:
      return {
        ...state,
        credentials: {
          ...state.credentials,
          stripe: {
            ...state.credentials.stripe,
            hasPaymentMethod: true
          }
        }
      }
    default:
      return state
  }
}