// PONER EL PRECIO ON THE BACKEND SIDE

import React, {Component} from "react"
import Burger from "../../components/Burger/Burger"
import BuildControls from "../../components/Burger/BuildControls/BuildControls"
import Modal from "../../components/UI/Modal/Modal"
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary"
import Spinner from "../../components/UI/Spinner/Spinner"
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler"
import {connect} from 'react-redux'
import * as actions from '../../store/actions/index'
import axios from "../../axios-orders"

export class BurgerBuilder extends Component { // export the class to be able to test it
  state = {
    purchasing: false,
  }

  componentWillMount() {
    this.props.onClearIngredients()
  }

  componentDidMount() {
    this.props.onInitIngredients()
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients).map(igKey => ingredients[igKey]).reduce((sum, value) => sum + value)
    return sum > 0
  }

  purchaseOnHandler = () => {
    if(this.props.isAuthenticated) { 
      this.setState({purchasing: true})
    } else {
      this.props.onSetAuthRedirectPath('/checkout')
      this.props.history.push('/auth') // from react-router
    }
  }

  purchaseOffHandler = () => {
    this.setState({purchasing: false})
  }

  purchaseContinueHandler = () => {
    this.props.onInitPurchase()
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
            ingredientAdded={this.props.onAddIngredients}
            ingredientRemoved={this.props.onRemoveIngredients}
            disabled={disabledInfo}
            price={this.props.price}
            purchasable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseOnHandler}
            ingredients={this.props.ings}
            clear={this.props.onClearIngredients}
            isAuth={this.props.isAuthenticated}/>
        </>
      )
      orderSummary = 
        <OrderSummary 
          ingredients={this.props.ings} 
          price={this.props.price} 
          cancel={this.purchaseOffHandler} 
          continue={this.purchaseContinueHandler}/>
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
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddIngredients: (ing) => dispatch(actions.addIngredient(ing)),
    onRemoveIngredients: (ing) => dispatch(actions.removeIngredient(ing)),
    onClearIngredients: () => dispatch(actions.clearIngredients()),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path) => {dispatch(actions.setAuthRedirectPath(path))}
  }  
}  

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))