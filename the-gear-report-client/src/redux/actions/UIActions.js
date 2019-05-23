import {
  SET_COUNTRY
} from '../types'

import { key } from '../../util/keys'

export const getLocationData = (location) => (dispatch) => {
  // fetch('https://ipapi.co/json') // grab country name
  //   .then(res => res.json())
  //   .then((position) => {
      // const country = position.country_name === "New Zealand" ? '11737723' : 'world'
      
      const country = '11737723'
      const proxyUrl = "https://cors-anywhere.herokuapp.com/"
      const url = `https://brendan.thecrag.com/api/index/detail/${country}?withdata=NodeID,NodeType,ParentID,Name,NumberRoutes,Point&to=arealeaf&key=${key}`
      fetch(proxyUrl + url)
      .then(countryData => countryData.json())
      .then(res => {
        const resObj = {}
        res.data.map((loc) => {
          const locationObj = {
            NodeID: loc[0],
            NodeType: loc[1],
            ParentID: loc[2],
            Name: loc[3],
            NumberRoutes: loc[4],
            Geo: loc[5]
          }    
          resObj[locationObj.ParentID]
          ? resObj[locationObj.ParentID].push(locationObj)
          : resObj[locationObj.ParentID] = [locationObj]
        })
        dispatch({
          type: SET_COUNTRY,
          payload: {
            country: resObj
          }
        })
  
    })
}
