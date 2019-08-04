import { 
  LOADING_USER_PROFILE,
  SET_ERRORS,
  SET_USER_PROFILE,
  SET_SEARCH,
  REMOVE_SUGGESTIONS,
} from '../types'
import axios from 'axios'

export const getUserData = (userHandle) => dispatch => {
  dispatch({ type: LOADING_USER_PROFILE })
  axios.get(`/user/${userHandle}`)
    .then(res => {
      dispatch({ 
        type: SET_USER_PROFILE,
        payload: res.data
      })
    })
    .catch(() => {
      dispatch({
        type: SET_ERRORS,
        payload: ['Failed to load profile']
      })
    })
}

export const textCompletion = (input, localArea) => dispatch => {
  axios.get(`/tc/search/textcompletion/${input}`)
    .then(response => {
      const list = response.data
      var res = []
      list.data.forEach(item => {
        var newObj = {
          label: item.name,
          id: item.id
        }
        
        let duplicate = false
        res.forEach(obj => { if(obj.id === item.id) duplicate = true })

        const isInNZ = localArea.indexOf(item.id) > -1
        
        if(!duplicate && isInNZ){
          return res.push(newObj)
        }
      })
      dispatch({ 
        type: SET_SEARCH,
        payload: res
      })
    })
}

export const removeSuggestions = () => dispatch => {
  dispatch({ type: REMOVE_SUGGESTIONS })
}

