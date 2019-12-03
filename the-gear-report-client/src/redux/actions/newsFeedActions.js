import {
  SET_INIT_NEWSFEED,
  ADD_NEWSFEED,
  LOADING_NEWSFEED
} from '../types'
import axios from 'axios'

export const getFirstNewsFeed = () => dispatch => {
  dispatch({ type: LOADING_NEWSFEED })
  axios
    .get('/newsFeed')
    .then(res => {
      dispatch({
        type: SET_INIT_NEWSFEED,
        payload: res.data
      })
    })
    .catch(err => {
      console.log(err);
    })
}

export const getAdditionalNewsFeed = (lastCreatedAt) => dispatch => {
  dispatch({ type: LOADING_NEWSFEED })
  axios
    .get(`/newsFeed/${lastCreatedAt}`)
    .then(res => {
      dispatch({
        type: ADD_NEWSFEED,
        payload: res.data
      })
    })
    .catch(err => {
      console.log(err)
    })
} 