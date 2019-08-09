import {
  SET_MESSAGE,
  SET_ERRORS,
  SET_HAS_PAY_TYPE
} from '../types'

export const createMessage = message => dispatch => {
  dispatch({ type: SET_MESSAGE, payload: [message] })
}

export const createError = error => dispatch => {
  dispatch({ type: SET_ERRORS, payload: [error] })
}

export const hasPaymentType = () => dispatch => {
  dispatch({ type: SET_HAS_PAY_TYPE })
}