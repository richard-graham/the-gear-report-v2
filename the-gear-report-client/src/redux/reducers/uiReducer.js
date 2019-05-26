import { 
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  STOP_LOADING_UI,
  SET_MESSAGE,
  CLEAR_MESSAGE,
  SET_COUNTRY,
  SET_LOCATION
} from '../types'

const initialState = {
  loading: false,
  errors: {
    general: ''
  },
  message: '',
  country: [],
  location: {}
}

export default function(state = initialState, action){
  switch(action.type){
    case SET_ERRORS:
      return {
        ...state,
        loading: false,
        errors: {
          general: action.payload
        }
      }
    case SET_COUNTRY:
      return {
        ...state,
        ...action.payload,
        loading: false
      }
    case SET_LOCATION:
      return {
        ...state,
        location: action.payload
      }
    case SET_MESSAGE:
      return {
        ...state,
        message: action.payload
      }
    case CLEAR_MESSAGE:
      return {
        ...state,
        loading: false,
        message: ''
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        errors: {}
      }
    case LOADING_UI:
      return {
        ...state,
        loading: true
      }
    case STOP_LOADING_UI:
      return {
        ...state,
        loading: false
      }
    default:
      return state
  }
}