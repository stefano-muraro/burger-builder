// PONER EL PRECIO ON THE BACKEND SIDE

import React, {Component} from "react"
import Burger from "../../components/Burger/Burger"
import BuildControls from "../../components/Burger/BuildControls/BuildControls"
import Modal from "../../components/UI/Modal/Modal"
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary"
import Spinner from "../../components/UI/Spinner/Spinner"
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler"
import {connect} from 'react-redux'
import * as action from '../../store/actions/index'
import axios from "../../axios-orders"

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  }

  componentDidMount () {
    console.log(this.props);
    this.props.initIngs()
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
    let burger = this.props.error ? <p>Burger can't be loaded!</p> : <Spinner/>
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
      orderSummary = 
        <OrderSummary 
          ingredients={this.props.ings} 
          price={this.props.price} 
          cancel={this.purchaseOffHandler} 
          continue={this. purchaseContinueHandler}/>
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
    price: state.totalPrice,
    error: state.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addIng: (ing) => dispatch(action.addIngredient(ing)),
    removeIng: (ing) => dispatch(action.removeIngredient(ing)),
    clearIngs: () => dispatch(action.clearIngredients()),
    initIngs: () => dispatch(action.initIngredients())
  }  
}  

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))