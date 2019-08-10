import {
  SET_MESSAGE,
  SET_ERRORS,
  SET_HAS_PAY_TYPE
} from '../types'
import axios from 'axios'

export const createMessage = message => dispatch => {
  dispatch({ type: SET_MESSAGE, payload: [message] })
}

export const createError = error => dispatch => {
  dispatch({ type: SET_ERRORS, payload: [error] })
}

export const hasPaymentType = () => dispatch => {
  dispatch({ type: SET_HAS_PAY_TYPE })
}

export const generateAutoInvoice = (stripeId, workPlanId, pledged, alertId) => dispatch => {
  const invoiceDetails = {
    stripeId,
    workPlanId,
    pledged,
    alertId
  }
  console.log('auto', invoiceDetails);
}

export const generateManualInvoice = (stripeId, workPlanId, pledged) => dispatch => {
  console.log('manual', stripeId, workPlanId, pledged);
}