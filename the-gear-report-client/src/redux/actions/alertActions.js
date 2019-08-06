import { 
  SET_ALERTS,
  SET_ALL_ALERTS,
  SET_RECENT_ALERTS,
  LOADING_DATA, 
  LOADING_ALERTS,
  LIKE_ALERT, 
  UNLIKE_ALERT, 
  DELETE_ALERT, 
  LOADING_UI, 
  SET_ERRORS,
  POST_ALERT,
  CLEAR_ERRORS,
  SET_ALERT,
  STOP_LOADING_UI,
  SUBMIT_COMMENT,
  SET_ALERT_IMAGE,
  SET_MESSAGE,
  RESET_ALERT_IMAGE,
  SET_USER_ALERTS,
  LOADING_ALL_ALERTS,
  DELETE_COMMENT
} from '../types'
import axios from 'axios'

// Get all alerts
export const getAlerts = () => (dispatch) => {
  dispatch({ type: LOADING_ALL_ALERTS })
  axios.get('/alerts/all')
    .then(res => {
      dispatch({ 
        type: SET_ALL_ALERTS, 
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: SET_ALERTS,
        payload: []
      })
    })
}

export const getRecentAlerts = () => (dispatch) => {
  dispatch({ type: LOADING_DATA })
  axios.get('/alerts/recent')
    .then(res => {
      dispatch({ 
        type: SET_RECENT_ALERTS, 
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: ['Error: Could not retrieve alerts']
      })
    })
}

export const getAlert = (alertId) => dispatch => {
  dispatch({ type: LOADING_UI })
  axios.get(`/alert/${alertId}`)
    .then(res => {
      dispatch({
        type: SET_ALERT,
        payload: res.data
      })
      dispatch({ type: STOP_LOADING_UI })
    })
    .catch(err => console.log(err))
}

export const getAlertsByUser = (userHandle) => (dispatch) => {
  axios.get(`/alerts/${userHandle}`)
  .then(res => {
    dispatch({
      type: SET_USER_ALERTS,
      payload: res.data
    })
  })
  .catch(err => console.log(err))
}

//Post an alert
export const postAlert = (newAlert) => dispatch => {
  dispatch({ type: LOADING_UI })
  axios.post('/alert', newAlert)
    .then(res => {
      dispatch({ 
        type: POST_ALERT, 
        payload: res.data
      })
      dispatch(clearErrors())
      dispatch({
        type: SET_MESSAGE,
        payload: ['Alert created successfully']
      })
    })
    .catch(err => {
      dispatch({ 
        type: SET_ERRORS, 
        payload: [`Error post failed`]
      })
    })
}

export const uploadAlertImage = (formData) => (dispatch) => {  
  dispatch({ type: LOADING_DATA })
  axios.post('/alert/add/image', formData)
    .then((res) => {
      dispatch({ 
        type: SET_ALERT_IMAGE,
        payload: res.data.url
      })
    })
    .then(() => {
      dispatch({
        type: SET_MESSAGE,
        payload: ['Image uploaded successfully']
      })
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: ['Upload failed']
      })
    })
}

export const resetAlertImages = () => (dispatch) => {
  dispatch({ type: RESET_ALERT_IMAGE })
}

//Like an alert
export const likeAlert = (alertId) => (dispatch) => {
  axios.get(`/alert/${alertId}/like`)
    .then((res) => {
      dispatch({ 
        type: LIKE_ALERT,
        payload: res.data
      })
    })
    .catch(err => console.log(err))
}

//Unlike an alert
export const unlikeAlert = (alertId) => (dispatch) => {
  axios.get(`/alert/${alertId}/unlike`)
    .then((res) => {
      dispatch({ 
        type: UNLIKE_ALERT,
        payload: res.data
      })
    })
    .catch(err => console.log(err))
}

//Submit a comment
export const submitComment = (alertId, commentData) => dispatch => {

  axios.post(`/alert/${alertId}/comment`, commentData)
    .then(res => {
      console.log(res.data);
      dispatch({ type: SUBMIT_COMMENT, payload: res.data })
      dispatch({ type: SET_MESSAGE, payload: ['Comment submitted successfully']})
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: [err.response.data.error]
      })
    })
}

export const deleteAlert = (alertId) => (dispatch) => {
  axios.delete(`/alert/${alertId}`)
    .then(() => {
      dispatch({ type: DELETE_ALERT, payload: alertId })
    })
    .catch(err => console.log(err))
}

export const deleteComment = (commentId) => (dispatch) => {
  axios.delete(`/comment/${commentId}`)
    .then((res) => {
      dispatch({ type: DELETE_COMMENT, payload: commentId })
    })
    .catch(err => {
      err = { err }
      let message = err
      dispatch({ type: SET_ERRORS, payload: [ message.err.response.data.error ] });
    })
}

export const getAlertsByLocation = id => dispatch => {
  dispatch({ type: LOADING_ALERTS })
  axios
    .get(`/alerts/location/${id}`)
    .then(res => {
      dispatch({ 
        type: SET_ALERTS,
        payload: res.data
      })
    })
    .catch(err => {
      console.log(err);
    })
}

export const clearErrors = () => dispatch => {
  dispatch({ type: CLEAR_ERRORS })
}
