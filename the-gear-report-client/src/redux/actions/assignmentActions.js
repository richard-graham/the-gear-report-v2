import {
  SET_ERRORS,
  SET_NEW_ASSIGNMENT,
  SET_ASSIGNMENTS,
  LOADING_ASSIGNMENTS
} from '../types.js'
import axios from 'axios'

export const createAssignment = (selectedDate, yesSponsor, cost, plan, alertId) => dispatch => {
  const newAssignment = {
    completionDate: selectedDate,
    sponsored: yesSponsor,
    cost: cost,
    plan: plan,
    alertId: alertId
  }
  axios
    .post('/assignment', newAssignment)
    .then(doc => {
      dispatch({ type: SET_NEW_ASSIGNMENT, payload: doc.data })
    })
}

export const getAssignmentByAlert = (alertId) => dispatch => {
  dispatch({ type: LOADING_ASSIGNMENTS })
  axios
    .get(`/assignment/alert/${alertId}`)
    .then(doc => {
      dispatch({ type: SET_ASSIGNMENTS, payload: doc.data })
    })
}

export const setError = error => dispatch => {
  dispatch({ type: SET_ERRORS, payload: [error]})
}