import {
  SET_ERRORS,
  SET_NEW_WORK_PLAN,
  SET_WORK_PLANS,
  LOADING_WORK_PLANS
} from '../types.js'
import axios from 'axios'

export const createWorkPlan = (selectedDate, yesSponsor, cost, plan, alertId) => dispatch => {
  const newWorkPlan = {
    completionDate: selectedDate,
    sponsored: yesSponsor,
    cost: cost,
    plan: plan,
    alertId: alertId
  }
  axios
    .post('/workPlan', newWorkPlan)
    .then(doc => {
      dispatch({ type: SET_NEW_WORK_PLAN, payload: doc.data })
    })
}

export const getWorkPlansByAlert = (alertId) => dispatch => {
  dispatch({ type: LOADING_WORK_PLANS })
  axios
    .get(`/workPlan/alert/${alertId}`)
    .then(doc => {
      dispatch({ type: SET_WORK_PLANS, payload: doc.data })
    })
}

export const submitPledge = (pledgeAmount, workPlanId) => dispatch => {
  
  axios
    .post(`/workPlan/pledge/${workPlanId}`, { pledgeAmount })
    .then(doc => {
      console.log(doc.data);
    })
}

export const setError = error => dispatch => {
  dispatch({ type: SET_ERRORS, payload: [error]})
}