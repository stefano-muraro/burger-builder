// PONER EL PRECIO ON THE BACKEND SIDE

import React, {Component} from "react"
import Burger from "../../components/Burger/Burger"
import BuildControls from "../../components/Burger/BuildControls/BuildControls"
import Modal from "../../components/UI/Modal/Modal"
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary"
import Spinner from "../../components/UI/Spinner/Spinner"
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler"
import axios from "../../axios-orders"
import {connect} from 'react-redux'
import * as actionTypes from '../../store/actions'

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount () {
    console.log(this.props);
  //   axios.get("/ingredientes.json")
  //     .then(response => this.setState({ingredients: response.data}))
  //     .catch(error => this.setState({error: true}))
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients).map(igKey => ingredients[igKey]).reduce((sum, value) => sum + value)
    return sum > 0
  }

  purchaseOnHandler = () => {
    this.setState({purchasing: true})
  }

  purchaseOffHandler = () => {
    this.setState({purchasing: false})
  }

  purchaseContinueHandler = () => {
    this.props.history.push("/checkout")
  }

  render() {
    const disabledInfo = {
      ...this.props.ings
    }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] === 0
    }
    
    let orderSummary = null
    let burger = this.state.error ? <p>Burger can't be loaded!</p> : <Spinner/>
    if (this.props.ings) {
      burger = (
        <>
          <Burger ingredients={this.props.ings}/>
          <BuildControls
            ingredientAdded={this.props.addIng}
            ingredientRemoved={this.props.removeIng}
            disabled={disabledInfo}
            price={this.props.price}
            purchasable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseOnHandler}
            ingredients={this.props.ings}
            clear={this.props.clearIngs}/>
        </>
      )
      orderSummary = <OrderSummary ingredients={this.props.ings} price={this.props.price} cancel={this.purchaseOffHandler} continue={this. purchaseContinueHandler}/>
      if (this.state.loading) {
        orderSummary = <Spinner/>
      }
    }

    return (
      <>
        <Modal show={this.state.purchasing} close={this.purchaseOffHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addIng: (ing) => dispatch({type: actionTypes.ADD_INGREDIENT, ingName: ing}),
    removeIng: (ing) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingName: ing}),
    clearIngs: () => dispatch({type: actionTypes.CLEAR_INGREDIENTS}) 
  }  
}  

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))