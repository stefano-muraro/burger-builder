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

export const purchaseBurger = (orderData, token) => {
  return dispatch => { // return a function where I get the dispatch function using redux-thunk middleware to then reach out to axios
    dispatch(purchaseStart()) // wrapped in a dispatch so that the action returned by purchaseStart is dispatched to the store
    axios.post("/orders.json?auth=" + token, orderData)
      .then(response => {
        console.log(response.data);
        dispatch(purchaseSuccess(response.data.name, orderData))
      })
      .catch(error => {
        dispatch(purchaseFail(error))
      })
  }
}

export const purchaseInit = () => {
  return {
    type:actionTypes.PURCHASE_INIT
  }
}

export const fetchOrdersStart = () => {
  return {
    type:actionTypes.FETCH_ORDERS_START
  }
}

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    fetchedOrders: orders
  }
}

export const fetchOrdersFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error
  }
}

export const fetchOrders = (token) => {
  return dispatch => {
    dispatch(fetchOrdersStart())
    axios.get("/orders.json?auth=" + token)
      .then (response => {        
        const fetchedOrders = []
        for (let key in response.data) {
          fetchedOrders.push({
            ...response.data[key],
            id: key
          })
        }
        dispatch(fetchOrdersSuccess(fetchedOrders))
      })
      .catch(error => {
        dispatch(fetchOrdersFail(error))
      })
  }
}