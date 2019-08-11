import {
  SET_MESSAGE,
  SET_ERRORS,
  SET_HAS_PAY_TYPE,
  CREATING_INVOICE,
  STOPPED_CREATING_INVOICE,
  SET_NEW_INVOICE
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

export const generateInvoice = (stripeId, workPlanId, pledged, alertId, method) => dispatch => {
  dispatch({ type: CREATING_INVOICE })
  const invoiceDetails = {
    stripeId,
    workPlanId,
    pledged,
    alertId,
    method
  }
  console.log(invoiceDetails);
  axios
    .post('/stripe/invoice', invoiceDetails)
    .then(res => {
      console.log(res);
      dispatch({ type: SET_MESSAGE, payload: ['Donation sent successfully'] })
      dispatch({ type: SET_NEW_INVOICE, payload: res.data })
    })
    .catch(err => {
      console.log('err', err);
      dispatch({ type: STOPPED_CREATING_INVOICE })
      dispatch({ type: SET_ERRORS, payload: ['Donation failed'] })
    })
}