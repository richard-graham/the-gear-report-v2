import {
  CREATE_ASSIGNMENT
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
  axios.post('/assignment', newAssignment)
}