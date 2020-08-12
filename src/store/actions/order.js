import * as actionTypes from './actionTypes'
import axios from "../../axios-orders"

export const purchaseSuccess = (id, data) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: data
  }
}

export const purchaseFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error
  }
}

export const purchaseStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  }
}

export const purchaseBurger = (orderData) => {
  return dispatch => { // return a function where I get the dispatch function using redux-thunk middleware to then reach out to axios
    dispatch(purchaseStart()) // wrapped in a dispatch so that the action returned by purchaseStart is dispatched to the store
    axios.post("/orders.json", orderData)
    .then(response => {
      console.log(response.data);
      dispatch(purchaseSuccess(response.data, orderData))
    })
    .catch(error => {
      dispatch(purchaseFail(error))
    })
  }
}