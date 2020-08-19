// Wrapper around the core content component we want to render to the screen
import React, {Component} from "react"
import Toolbar from "../../components/Navigation/Toolbar/Toolbar"
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer"
import classes from "./Layout.module.css"
import {connect} from 'react-redux'

class Layout extends Component {
  state = {
    showSideDrawer: false
  }

  sideDrawerClosedHandler = () => {
    this.setState({showSideDrawer: false})
  } 
  sideDrawerOpenHandler = () => {
    this.setState({showSideDrawer: true})
  } 

  render() {
    return (
      <>
        <Toolbar 
          openSideDrawer={this.sideDrawerOpenHandler} 
          isAuth={this.props.isAuthenticated}/>
        <SideDrawer 
          open={this.state.showSideDrawer} 
          closed={this.sideDrawerClosedHandler} 
          isAuth={this.props.isAuthenticated}/>
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </> 
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

export default connect(mapStateToProps)(Layout) // (Layout) is the argument for the fuction returned by the connect() function