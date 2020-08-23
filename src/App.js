import React, {Component, Suspense} from 'react';
import Layout from "./containers/Layout/Layout"
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder"
import Spinner from './components/UI/Spinner/Spinner'
import {Route, Switch, Redirect} from "react-router-dom"
import Logout from './containers/Auth/Logout/Logout'
import {connect} from 'react-redux'
import * as actions from './store/actions/index'

// Lazy loading
const Checkout = React.lazy(() => import('./containers/Checkout/Checkout'))
const Orders = React.lazy(() => import('./containers/Orders/Orders'))
const Auth = React.lazy(() => import('./containers/Auth/Auth'))

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup() // we dispatch it from App component (the root component) because it doesn't matter which route we visit, this component is always loaded when the applications loads, hence, this actions is always dispatched.
  }

  render() {
    let routes = (
      <Suspense fallback={<Spinner></Spinner>}> {/*https://reactjs.org/docs/code-splitting.html#route-based-code-splitting*/}
        <Switch>
          <Route path="/auth" component={Auth}/>
          <Route path="/" exact component={BurgerBuilder}/>
          <Redirect to='/'/> {/* for unknown routes */}
        </Switch>
      </Suspense>
    )
  
    if (this.props.isAuthenticated) {
      routes = (
        <Suspense fallback={<Spinner></Spinner>}>
          <Switch>
            <Route path="/checkout" component={Checkout}/>
            <Route path="/orders" component={Orders}/>
            <Route path="/auth" component={Auth}/>
            <Route path="/logout" component={Logout}/>
            <Route path="/" exact component={BurgerBuilder}/>
            <Redirect to='/'/> {/* for unknown routes */}
          </Switch>
        </Suspense>
      )
    }
    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    onTryAutoSignup: () => {dispatch(actions.authCheckState())}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
