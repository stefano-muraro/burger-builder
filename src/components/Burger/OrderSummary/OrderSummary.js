import React from "react"
import Button from "../../UI/Button/Button"

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map(igKey => {
    return (
      <li key={igKey}>
        <span style= {{textTransform: "capitalize"}}>{igKey}</span>
        : {props.ingredients[igKey]} {props.ingredients[igKey] === 1 ? "unit" : "units"}
      </li>
    )
  })
  return (
    <>
      <h3>Your Order</h3>
      <p>Alta burger con los siguientes ingredientes:</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p><strong>Total Price: ${props.price.toFixed(2)}</strong></p>
      <p>Continue to checkout?</p>
      <Button btnType="Success" clicked={props.continue}>CONTINUE</Button>
      <Button btnType="Danger" clicked={props.cancel}>CANCEL</Button>
    </>
  )
}

export default orderSummary