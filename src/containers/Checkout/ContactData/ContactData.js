import React, {Component} from "react"
import Button from "../../../components/UI/Button/Button"
import Spinner from "../../../components/UI/Spinner/Spinner"
import classes from "./ContactData.module.css"
import axios from "../../../axios-orders"
import Input from "../../../components/UI/Input/Input"
import {connect} from 'react-redux'
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler"
import * as action from '../../../store/actions/index'

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Enter your name"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      address: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Enter your address"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipCode:  {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Enter your ZIP Code"
        },
        value: "",
        validation: {
          required: true,
          minLength: 3,
          maxLength: 5
        },
        valid: false,
        touched: false    
      },
      country:  {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Enter your country"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email:  {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Enter your e-mail"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      delivery:  {
        elementType: "select",
        elementConfig: {
          options: [
            {value: "normal", displayValue: "Normal"},
            {value: "express", displayValue: "Express"}
          ]
        },
        value: "normal",
        validation: {},
        valid: true,
      }
    },
    formValid: false
  }

  orderHandler = (event) => {
    event.preventDefault()
    
    const formData = {}
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
    }

    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData
    }
    
    this.props.onOrderBurger(order)
  }

  checkValidation(value, rules) {
    let isValid = true;
    if (!rules) {
        return true;
    }
    
    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid
    }

    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid
    }

    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid
    }

    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid
    }

    return isValid;
}

  inputChangedHandler = (event, inputIdentifier) => {
    // can't access this.state.inputIdentifier.value and update the value, so we do this instead:
    const updatedOrderForm = {...this.state.orderForm} // shallow copy. It copies only the first layer (name, street...)
    const updatedFormElement = {...updatedOrderForm[inputIdentifier]}
    updatedFormElement.value = event.target.value
    updatedFormElement.valid = this.checkValidation(updatedFormElement.value, updatedFormElement.validation)
    updatedFormElement.touched = true
    updatedOrderForm[inputIdentifier] = updatedFormElement

    let updatedFormValid = true
    for(let inputIdentifier in updatedOrderForm) {
      updatedFormValid = updatedOrderForm[inputIdentifier].valid && updatedFormValid
    }
    
    this.setState({orderForm: updatedOrderForm, formValid: updatedFormValid})
  }

  render() {
    const formElementArray = []
    for (let key in this.state.orderForm) {
      formElementArray.push({
        id: key,
        config: this.state.orderForm[key]
      })
    }
    
    let form = (
      <form  onSubmit={this.orderHandler}>
          {formElementArray.map(formElement => (
            <Input
              key={formElement.id}
              label={formElement.id}
              elementType={formElement.config.elementType} 
              elementConfig={formElement.config.elementConfig} 
              value={formElement.config.value} 
              valid={formElement.config.valid}
              touched={formElement.config.touched}
              changed={(event) => this.inputChangedHandler(event, formElement.id)}
            />
          ))}
          <Button btnType="Success" disabled={!this.state.formValid}>ORDER</Button>
        </form>
    )
    if (this.props.loading) {
      form = <Spinner/>
    }

    return (
      <div className={classes.ContactData}>
        <h4>Your Contact Data</h4>
        {form}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData) => dispatch(action.purchaseBurger(orderData))
  }  
}  

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios))