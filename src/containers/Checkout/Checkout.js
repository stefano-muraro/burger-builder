import React, {Component} from "react"
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary"
import {Route, Redirect} from "react-router-dom"
import ContactData from "./ContactData/ContactData"
import {connect} from 'react-redux'

class Checkout extends Component {

  checkoutCancelledHandler = () => {    
    this.props.history.goBack()
  }

  checkoutContinuedHandler = () => {    
    this.props.history.replace("/checkout/contact-data")
  }

  render() {
    let checkoutSummary
    if (this.props.ings){
      checkoutSummary =
      <div>
        <CheckoutSummary 
          ingredients={this.props.ings}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}/>
        <Route 
        path={this.props.match.path + "/contact-data"} 
        component={ContactData}/>
      </div>
    } else {
      checkoutSummary = <Redirect from="/checkout/contact-data" to="/burger-builder"/> 
    }
    return checkoutSummary
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    loading: state.loading
  }
}

export default connect(mapStateToProps)(Checkout)