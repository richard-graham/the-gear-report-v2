import { 
  SET_USER, 
  SET_ERRORS, 
  CLEAR_ERRORS, 
  LOADING_UI, 
  SET_UNAUTHENTICATED, 
  LOADING_USER, 
  MARK_NOTIFICATIONS_READ,
  SET_MESSAGE,
} from '../types'
import axios from 'axios'

// export const updateUserLocation = () => (dispatch) => {
//   navigator.geolocation.getCurrentPosition((userPosition) => { 
//     dispatch({ // user agrees to sharing location
//       type: SET_USER_LOCATION,
//       payload: {
//         lat: userPosition.coords.latitude,
//         lng: userPosition.coords.longitude,
//         zoom: 11,
//         haveUsersLocation: true
//       }
//     })
// }, () => { // if user says no to tracking location use api
//   fetch('https://ipapi.co/json')
//     .then(res => res.json())
//     .then(position => {
//       dispatch({ 
//         type: SET_USER_LOCATION,
//         payload: {
//           lat: -41.00485,
//           lng: 172.6775,
//           zoom: 5,
//           haveUsersLocation: false,
//           countryName: position.country_name,
//           regionName: position.region 
//         }
//       })
//     })
//   }, {
//     enableHighAccuracy: false,
//     timeout: 5000,
//     maximumAge: Infinity
//   }
//   );
// }

export const loginUser = (userData, history) => (dispatch) => { 
  dispatch({ type: LOADING_UI })
  axios.post('/login', userData)
      .then(res => {
        setAuthorizationHeader(res.data.token)
        dispatch(getUserData())
        dispatch({ type: CLEAR_ERRORS })
        history.push('/')
      })
      .catch(err => {
        dispatch({ 
          type: SET_ERRORS, 
          payload: err.response.data 
        })
      })
}

export const signupUser = (newUserData, history) => (dispatch) => { 
  dispatch({ type: LOADING_UI })
  axios.post('/signup', newUserData)
      .then(res => {
        setAuthorizationHeader(res.data.token)
        dispatch(getUserData())
        dispatch({ type: CLEAR_ERRORS })
        dispatch({
          type: SET_MESSAGE,
          payload: 'Sign up successful'
        })
        history.push('/')
      })
      .catch(err => {
        console.log(err.response.data);
        dispatch({ 
          type: SET_ERRORS, 
          payload: err.response.data 
        })
      })
}

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('FBIdToken')
  delete axios.defaults.headers.common['Authorization']
  dispatch({ type: SET_UNAUTHENTICATED })
}


export const getUserData = () => (dispatch) => {
  dispatch({ type: LOADING_USER })
  axios.get('/user')
    .then(res => {
      dispatch({ 
        type: SET_USER,
        payload: res.data
      })
    })
    .catch(err => {
      console.log(err);
    })
}

export const uploadUserImage = (formData) => (dispatch) => {  
  dispatch({ type: LOADING_USER })
  axios.post('/user/image', formData)
    .then(() => {
      dispatch(getUserData())
    })
    .catch(err => {
      console.log(err);
    })
}

export const editUserDetails = (userDetails) => (dispatch) => {
  axios.post('/user', userDetails)
    .then((res) => {
      dispatch(getUserData()) 
      dispatch({ type: SET_MESSAGE, payload: res.data.message })
    })
    .catch(err => {
      console.log(err);
    })
}

export const markNotificationsRead = (notificationIds) => (dispatch) => {
  axios.post('/notifications', notificationIds)
    .then(res => {
      dispatch({ type: MARK_NOTIFICATIONS_READ })
    })
    .catch(err => console.log(err))
}

export const setError = (error) => (dispatch) => {
  dispatch({
    type: SET_ERRORS,
    payload: error
  })
}

const setAuthorizationHeader = (token) => {
  const FBIdToken = `Bearer ${token}`
        localStorage.setItem('FBIdToken', FBIdToken) // saves token to local storage in case of page refresh etc
        axios.defaults.headers.common['Authorization'] = FBIdToken
}