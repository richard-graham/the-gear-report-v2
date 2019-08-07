import { 
  SET_ALERTS, 
  SET_ALL_ALERTS,
  SET_RECENT_ALERTS,
  LIKE_ALERT, 
  UNLIKE_ALERT, 
  LOADING_DATA, 
  DELETE_ALERT,
  POST_ALERT,
  SET_ALERT,
  SUBMIT_COMMENT,
  SET_ALERT_IMAGE,
  RESET_ALERT_IMAGE,
  SET_USER_PROFILE,
  SET_SEARCH,
  REMOVE_SUGGESTIONS,
  LOADING_ALERTS,
  LOADING_ALL_ALERTS,
  LIKE_COMMENT,
  UNLIKE_COMMENT,
  LOADING_USER_PROFILE,
  UPDATE_USER_PROFILE,
  SET_USER_IMAGE,
  DELETE_COMMENT,
  SET_NEW_WORK_PLAN,
  SET_WORK_PLANS,
  LOADING_WORK_PLANS
} from '../types'

const initialState = {
  alerts: [],
  allAlerts: [],
  recentAlerts: [],
  userAlerts: [],
  alert: {
    workPlans: [],
    loadingWorkPlans: false
  },
  location: {},
  loading: false,
  loadingAlerts: false,
  loadingAllAlerts: false,
  newAlert: {
    images: []
  },
  searchResults: [{label: 'test'}],
  userProfile: {
    loading: false,
    user: {
      imageUrl: '',
      handle: '',
      email: '',
      city: '',
      createdAt: '',
      occupation: '',
      bio: '',
    }
  }
}

export default function(state = initialState, action){
  switch(action.type){
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      }
    case LOADING_USER_PROFILE:
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          loading: true
        }
      }
    case UPDATE_USER_PROFILE:
      return {
        ...state,
        userProfile: {
          user: action.payload
        }
      }
    case SET_USER_IMAGE:
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          user: {
            ...state.userProfile.user,
            imageUrl: action.payload
          }
        }
      }
    case SET_ALERTS:
      return {
        ...state,
        alerts: action.payload,
        loadingAlerts: false
      }
    case SET_ALL_ALERTS:
      return {
        ...state,
        allAlerts: action.payload,
        loadingAllAlerts: false
      }
    case SET_RECENT_ALERTS:
      return {
        ...state,
        recentAlerts: action.payload,
        loading: false
      }
    case SET_ALERT:
      return {
        ...state,
        alert: {
          ...action.payload,
          workPlans: state.alert.workPlans,
          loadingWorkPlans: state.alert.loadingWorkPlans,
        }
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
    case DELETE_ALERT: // instead of doing a full reload just delete the alert locally in state
      let alertIndex = state.alerts.findIndex(alert => alert.alertId === action.payload)
      state.alerts.splice(alertIndex, 1)
      return {
        ...state
      }
    case DELETE_COMMENT:
      let commentIndex = state.alert.comments.findIndex(comment => comment.id === action.payload)
      state.alert.comments.splice(commentIndex, 1)
      return {
        ...state,
        alert: {
          ...state.alert,
          commentCount: state.alert.commentCount - 1
        }
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
          comments: [action.payload, ...state.alert.comments], // put new comment to the top of the list in alertDialog
          commentCount: state.alert.commentCount + 1
        }
      }
    case SET_ALERT_IMAGE:
      return {
        ...state,
        loading: false,
        newAlert: {
          ...state.newAlert,
          images: [...state.newAlert.images, action.payload]
        }
      }
    case RESET_ALERT_IMAGE:
      return {
        ...state,
        newAlert: {
          images: []
        }
      }
    case SET_USER_PROFILE:
      return {
        ...state,
        userProfile: action.payload,
        loading: false
      }
    case SET_SEARCH:
      return {
        ...state,
        searchResults: action.payload
      }
    case REMOVE_SUGGESTIONS:
      return {
        ...state,
        searchResults: []
      }
    case LOADING_ALERTS:
      return {
        ...state,
        loadingAlerts: true
      }
    case LOADING_ALL_ALERTS:
      return {
        ...state,
        loadingAllAlerts: true
      }
    case LIKE_COMMENT:
      var newLikeComments = []
      state.alert.comments.forEach(comment => {
        if(action.payload.commentId === comment.id){
          comment.likeCount++
        }
        newLikeComments.push(comment)
      })
      return {
        ...state,
        alert: {
          ...state.alert,
          comments: newLikeComments
        }
      }
    case UNLIKE_COMMENT:
      var newUnlikeComments = []
      state.alert.comments.forEach(comment => {
        if(action.payload.commentId === comment.id){
          comment.likeCount--
        }
        newUnlikeComments.push(comment)
      })
      return {
        ...state,
        alert: {
          ...state.alert,
          comments: newUnlikeComments
        }
      }
      case SET_NEW_WORK_PLAN:
        let newWorkPlans = state.alert.workPlans
        newWorkPlans.push(action.payload)
        return {
          ...state,
          alert: {
            ...state.alert,
            workPlans: newWorkPlans
          }
        }
      case SET_WORK_PLANS:
        return {
          ...state,
          alert: {
            ...state.alert,
            workPlans: action.payload,
            loadingWorkPlans: false
          }
        }
      case LOADING_WORK_PLANS:
        return {
          ...state,
          alert: {
            ...state.alert,
            loadingWorkPlans: true
          }
        }
    default:
     return state
  }
}