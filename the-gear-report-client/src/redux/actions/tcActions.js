import {
  SET_COUNTRY,
  LOADING_UI,
  SET_ERRORS,
  SET_LOCATION,
  LOADING_LOCATION
} from '../types'
import axios from 'axios'
import { key } from '../../util/keys'
const proxyUrl = "https://cors-anywhere.herokuapp.com/"


export const getLocationData = (location) => (dispatch) => {
  dispatch({ type: LOADING_UI })
  axios
  .get(`/tc/location/${location}`)
  .then(res => {
    dispatch({
      type: SET_COUNTRY,
      payload: {
        country: res.data
      }
    })
  })
  .catch(err => {
    dispatch({ 
      type: SET_ERRORS, 
      payload: `Error getting location data`
    })
  })
}

export const getNode = (NodeID) => (dispatch) => {
  dispatch({ type: LOADING_LOCATION })
  const url = `https://brendan.thecrag.com/api/node/id/${NodeID}?show=info,children&key=${key}`
  fetch(proxyUrl + url)
    .then(res => res.json())
    .then(res => {
      var data = res.data
      data.children = res.children
      data.additionalInfo = true
      // data.geo = country[data.parentID][data.name].geo 
      // tc data doesn't include geo coords so grab them from country obj
      dispatch({
        type: SET_LOCATION,
        payload: data
      })
    })
    .catch(err => {
      console.log(err);
    })
} 

export const updateSearchLocation = (id, country, type) => dispatch => {
  dispatch({ type: LOADING_LOCATION })
  axios
    .get(`/tc/search/location/${id}`)
    .then(res => {
      var data = res.data.data
      type === 'searched' ? data.searched = true : data.searched = false
      data.children = res.data.children
      data.additionalInfo = true
      data.zoom = 12
      data.geo = country[data.parentID][data.name].geo // tc data doesn't include geo coords so grab them from country obj
      dispatch({
        type: SET_LOCATION,
        payload: data,
        searched: type === 'searched' ? true : false
      })
    })
    .catch(err =>{
      console.log(err)
    })
}