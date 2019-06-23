import {
  SET_COUNTRY,
  LOADING_UI,
  SET_ERRORS,
  SET_LOCATION,
  LOADING_LOCATION
} from '../types'

import { key } from '../../util/keys'
const proxyUrl = "https://cors-anywhere.herokuapp.com/"

export const getLocationData = (location) => (dispatch) => {
      dispatch({ type: LOADING_UI })
      const url = `https://brendan.thecrag.com/api/index/detail/${location}?withdata=NodeID,ParentID,Name,NumberRoutes,AreaType,Point&to=arealeaf&key=${key}`
      fetch(proxyUrl + url) // Fetch data, proxy removes CORS errors
      .then(countryData => countryData.json())
      .then(res => {
        const resObj = {}

        resObj.parent = {
          id: res.data[0][0],
          parentID: res.data[0][1],
          name: res.data[0][2],
          numberRoutes: res.data[0][3],
          type: res.data[0][4],
          geo: res.data[0][5]
        }
        res.data.map((loc) => {
          if (loc[4] !== "G" && loc[3] > 0) {
            const locationObj = {
              id: loc[0],
              parentID: loc[1],
              name: loc[2],
              numberRoutes: loc[3],
              type: loc[4],
              geo: loc[5]
            }    
            if (resObj[locationObj.parentID] === undefined) {
              resObj[locationObj.parentID] = {}
            }
            return resObj[locationObj.parentID][loc[2]] = locationObj
          }
          return null
        })
        // Sort alphabetically for UI
        const resOrdered = {}
        Object.keys(resObj).forEach(entry => {
          const sorted = {}
          Object.keys(resObj[entry]).sort().forEach(key => {
          sorted[key] = resObj[entry][key]
          })
          resOrdered[entry] = sorted
        })
        dispatch({
          type: SET_COUNTRY,
          payload: {
            country: resOrdered
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

export const getNode = (NodeID, country) => (dispatch) => {
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
  const url = `https://brendan.thecrag.com/api/node/id/${id}?show=info,children,ancestors&key=${key}`
  dispatch({ type: LOADING_LOCATION })
  fetch(proxyUrl + url)
    .then(res => res.json())
    .then(res => {
      var data = res.data
      data.searched = true
      data.children = res.children
      data.additionalInfo = true
      data.zoom = 12
      data.geo = country[data.parentID][data.name].geo // tc data doesn't include geo coords so grab them from country obj
      dispatch({
        type: SET_LOCATION,
        payload: data,
        searched: true 
      })
    })
    .catch(err =>{
      console.log(err)
    })
}