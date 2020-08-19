import React, {Component} from "react"
import Order from "../../components/Order/Order"
import axios from "../../axios-orders"
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler"
import Spinner from "../../components/UI/Spinner/Spinner"
import {connect} from 'react-redux'
import * as actions from '../../store/actions/index'

class Orders extends Component{

  componentWillMount() {
    this.props.onFetchOrders(this.props.token)
  }

  render() {
    let orderList = this.props.error ? <p>Order list can't be loaded!</p> : <Spinner/>
    if(!this.props.loading) {
      orderList = (
        <div>
          {this.props.orders.map(order => (
            <Order 
              key={order.id}
              ingredients={order.ingredients}
              price={order.price}/>
          ))}
        </div>)
    }
    return orderList
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    error: state.order.error,
    token: state.auth.token
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: (token) => {dispatch(actions.fetchOrders(token))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios))