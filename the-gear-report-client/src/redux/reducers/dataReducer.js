import { 
  SET_ALERTS, 
  LIKE_ALERT, 
  UNLIKE_ALERT, 
  LOADING_DATA, 
  DELETE_ALERT,
  POST_ALERT,
  SET_ALERT,
  SUBMIT_COMMENT
} from '../types'

const initialState = {
  alerts: [],
  alert: {},
  location: {},
  loading: false
}

export default function(state = initialState, action){
  switch(action.type){
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      }
    case SET_ALERTS:
      return {
        ...state,
        screams: action.payload,
        loading: false
      }
    case SET_ALERT:
      return {
        ...state,
        alert: action.payload
      }
    case LIKE_ALERT:
    case UNLIKE_ALERT: // in both cases do the same thing
      let index = state.alerts.findIndex((alert) => alert.alertId === action.payload.alertId) //gives us the index from the alert passed into the action
      state.alerts[index] = action.payload // replace it in state with the version with updated likes
      if(state.alert.alertId === action.payload.alertId){
        state.alert = action.payload
      }
      return {
        ...state
      }
    case DELETE_ALERT: // instead of doing a full reload just delete the scream locally in state
      index = state.alerts.findIndex(alert => alert.alertId === action.payload)
      state.alerts.splice(index, 1)
      return {
        ...state
      }
    case POST_ALERT:
      return {
        ...state,
        alerts: [
          action.payload, //puts the new alert to the front 
          ...state.alerts
        ]
      }
    case SUBMIT_COMMENT:
      return {
        ...state,
        alert: {
          ...state.alert,
          comments: [action.payload, ...state.alert.comments] // put new comment to the top of the list in alertDialog
        }
      }
    default:
     return state
  }
}