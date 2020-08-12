import * as actionTypes from '../actions/actionTypes'

const initialState = {
  ingredients: null, // fetching from Firebase
  totalPrice: 4,
  error: false
}

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

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
}

export default burgerBuilderReducer