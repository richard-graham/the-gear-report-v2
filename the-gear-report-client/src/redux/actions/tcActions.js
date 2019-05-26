import {
  SET_COUNTRY,
  LOADING_UI,
  SET_ERRORS
} from '../types'

import { key } from '../../util/keys'

export const getLocationData = (location) => (dispatch) => {
  // fetch('https://ipapi.co/json') // grab country name
  //   .then(res => res.json())
  //   .then((position) => {
      // const country = position.country_name === "New Zealand" ? '11737723' : 'world'
      dispatch({ type: LOADING_UI })
      const proxyUrl = "https://cors-anywhere.herokuapp.com/"
      const url = `https://brendan.thecrag.com/api/index/detail/${location}?withdata=NodeID,ParentID,Name,NumberRoutes,AreaType,Point&to=arealeaf&key=${key}`
      fetch(proxyUrl + url)
      .then(countryData => countryData.json())
      .then(res => {
        const resObj = {}

        resObj.parent = {
          NodeID: res.data[0][0],
          ParentID: res.data[0][1],
          Name: res.data[0][2],
          NumberRoutes: res.data[0][3],
          AreaType: res.data[0][4],
          Geo: res.data[0][5]
        }
        res.data.map((loc) => {
          const locationObj = {
            NodeID: loc[0],
            ParentID: loc[1],
            Name: loc[2],
            NumberRoutes: loc[3],
            AreaType: loc[4],
            Geo: loc[5]
          }    
          if (resObj[locationObj.ParentID] === undefined) {
            resObj[locationObj.ParentID] = []
          }
          return resObj[locationObj.ParentID].push(locationObj)
        })
        dispatch({
          type: SET_COUNTRY,
          payload: {
            country: resObj
          }
        })
    })
    .catch(err => {
      dispatch({ 
        type: SET_ERRORS, 
        payload: err.response.data 
      })
    })
}
