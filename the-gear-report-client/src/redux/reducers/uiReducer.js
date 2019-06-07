import { 
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  STOP_LOADING_UI,
  SET_MESSAGE,
  CLEAR_MESSAGE,
  SET_COUNTRY,
  SET_LOCATION,
  RESET_LOCATION,
  LOADING_LOCATION,
} from '../types'

const initialState = {
  loading: false,
  errors: {
    general: ''
  },  
  message: '',
  country: [],
  location: {
    type: "R",
    geo: [172.6775, -41.00485],
    name: "New Zealand",
    id: 11737723,
    numberRoutes: 12044,
    parentID: 7546063,
    zoom: 5,
    additionalInfo: false,
    loading: false,
    childIds: []
  }
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
      if(action.duplicate){
        return {
          ...state,
          location: {
            ...state.location,
            ...action.payload,
            loading: false
          }
        }
      } else {
        return {
          ...state,
          location: {
            ...action.payload,
            loading: false
          }
        }
      }
    case RESET_LOCATION:
      return {
        ...state,
        location: initialState.location
      }
    case LOADING_LOCATION:
      return {
        ...state,
        location: {
          ...state.location,
          loading: true
        }
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