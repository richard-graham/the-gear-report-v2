import {
  SET_COUNTRY,
  LOADING_UI,
  SET_ERRORS
} from '../types'

import { key } from '../../util/keys'

export const getLocationData = (location) => (dispatch) => {
      dispatch({ type: LOADING_UI })
      const proxyUrl = "https://cors-anywhere.herokuapp.com/"
      const url = `https://brendan.thecrag.com/api/index/detail/${location}?withdata=NodeID,ParentID,Name,NumberRoutes,AreaType,Point&to=arealeaf&key=${key}`
      fetch(proxyUrl + url) // Fetch data, proxy removes CORS errors
      .then(countryData => countryData.json())
      .then(res => {
        console.log(res);
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
          if (loc[4] !== "G" && loc[3] > 0) {
            const locationObj = {
              NodeID: loc[0],
              ParentID: loc[1],
              Name: loc[2],
              NumberRoutes: loc[3],
              AreaType: loc[4],
              Geo: loc[5]
            }    
            if (resObj[locationObj.ParentID] === undefined) {
              resObj[locationObj.ParentID] = {}
            }
            return resObj[locationObj.ParentID][loc[2]] = locationObj
          }
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
        payload: err
      })
    })
}
