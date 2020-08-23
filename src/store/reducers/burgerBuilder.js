import * as actionTypes from '../actions/actionTypes'
import {updateObject} from '../../shared/utility'

const initialState = {
  ingredients: null, // fetching from Firebase
  totalPrice: 4,
  error: false,
  building: false
}

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

const addIngredient = (state, action) => {
  const updatedIngredient1 = {[action.ingName]: state.ingredients[action.ingName] + 1}
  const updatedIngredients1 = updateObject(state.ingredients, updatedIngredient1)
  const updatedState1 = {
    ingredients: updatedIngredients1,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingName],
    building: true
  }
  return updateObject(state, updatedState1)
} 

const removeIngredient = (state, action) => {
  const updatedIngredient2 = {[action.ingName]: state.ingredients[action.ingName] - 1}
  const updatedIngredients2 = updateObject(state.ingredients, updatedIngredient2)
  const updatedState2 = {
    ingredients: updatedIngredients2,
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingName]
  }
  return updateObject(state, updatedState2)
}

const clearIngredient = (state, action) => {
  const updatedIngredients3 = {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0
  }
  const updatedState3 = {
    ingredients: updatedIngredients3,
    totalPrice: 4,
  }
  return updateObject(state, updatedState3)
}

const setIngredients = (state, action) => {
  const updatedState4 = {
    ingredients: action.ingredients,
    error: false,
    building: false
  }
  return updateObject(state, updatedState4)
}

const fetchIngredientsFailed = (state, action) => {
  const updatedState5 = {error: true}
  return updateObject(state, updatedState5)
}

const burgerBuilderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT: return addIngredient(state, action)
    case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action)
    case actionTypes.CLEAR_INGREDIENTS: return clearIngredient(state, action)
    case actionTypes.SET_INGREDIENTS: return setIngredients(state, action)
    case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action)
    default: return state
  }
}

export default burgerBuilderReducer


/* OLD APPROACH
const burgerBuilderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingName]: state.ingredients[action.ingName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingName]
      }
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingName]: state.ingredients[action.ingName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingName]
      }
    case actionTypes.CLEAR_INGREDIENTS:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          salad: 0,
          bacon: 0,
          cheese: 0,
          meat: 0
        },
        totalPrice: 4
      }
    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: action.ingredients, // see video 306 to change ingredients order
        error: false
      }
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true
      }
    default: return state
  }
}*/