import React from 'react';
import Layout from "./containers/Layout/Layout"
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder"
import Checkout from "./containers/Checkout/Checkout"
import {Route, Redirect, Switch} from "react-router-dom"
import Orders from "./containers/Orders/Orders"

function App() {
  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/burger-builder" component={BurgerBuilder}/>
          <Route path="/checkout" component={Checkout}/>
          <Route path="/orders" component={Orders}/>
          <Redirect from="/" to="/burger-builder"/> 
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
