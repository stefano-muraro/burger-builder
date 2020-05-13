// PONER EL PRECIO ON THE BACKEND SIDE

import React, {Component} from "react"
import Burger from "../../components/Burger/Burger"
import BuildControls from "../../components/Burger/BuildControls/BuildControls"
import Modal from "../../components/UI/Modal/Modal"
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary"
import Spinner from "../../components/UI/Spinner/Spinner"
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler"
import axios from "../../axios-orders"

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount () {
    axios.get("/ingredientes.json")
      .then(response => this.setState({ingredients: response.data}))
      .catch(error => this.setState({error: true}))
  }

  updatePurchaseState (ingredients) {
    const sum = Object.keys(ingredients).map(igKey => ingredients[igKey]).reduce((sum, value) => sum + value)
    this.setState({purchasable: sum > 0})
  }

  addIngredientHandler = (type) => {
    const updatedIngredients = {...this.state.ingredients}
    updatedIngredients[type] = this.state.ingredients[type] + 1
    const updatedPrice = this.state.totalPrice + INGREDIENT_PRICES[type]
    this.setState({ingredients: updatedIngredients, totalPrice: updatedPrice})
    this.updatePurchaseState(updatedIngredients)
  }

  removeIngredientHandler = (type) => {
    if (this.state.ingredients[type] === 0) {
      return
    }
    const updatedIngredients = {...this.state.ingredients}
    updatedIngredients[type] = this.state.ingredients[type] - 1
    const updatedPrice = this.state.totalPrice - INGREDIENT_PRICES[type]
    this.setState({ingredients: updatedIngredients, totalPrice: updatedPrice})
    this.updatePurchaseState(updatedIngredients)
  }

  purchaseOnHandler = () => {
    this.setState({purchasing: true})
  }

  purchaseOffHandler = () => {
    this.setState({purchasing: false})
  }

  purchaseContinueHandler = () => {
    this.setState({loading: true})
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "Stefano Muraro",
        address: {
          street: "Burgstrasse 6",
          zipCode: "08499",
          country: "Germany"
         },
        email: "test@test.com"
      },
      delivery: "express"
    }

    axios.post("/orders.json", order)
      .then(response => {this.setState({loading: false, purchasing: false})})
      // .then(response => {setTimeout(() => {this.setState({loading: false, purchasing: false})}, 3000)}) // Timer para ver el Spinner
      .catch(error => {this.setState({loading: false, purchasing: false})})
  }

  clearHandler = () => {
    const clear = {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    }
    this.setState({ingredients: clear, purchasable: false, totalPrice: 4})
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] === 0
    }
    
    let orderSummary = null
    let burger = this.state.error ? <p>Burger can't be loaded!</p> : <Spinner/>
    if (this.state.ingredients) {
      burger = (
        <>
          <Burger ingredients={this.state.ingredients}/>
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            price={this.state.totalPrice}
            purchasable={this.state.purchasable}
            ordered={this.purchaseOnHandler}
            ingredients={this.state.ingredients}
            clear={this.clearHandler}/>
        </>
      )
      orderSummary = <OrderSummary ingredients={this.state.ingredients} price={this.state.totalPrice} cancel={this.purchaseOffHandler} continue={this. purchaseContinueHandler}/>
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

export default withErrorHandler(BurgerBuilder, axios)