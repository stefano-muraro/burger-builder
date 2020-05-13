// Wrapper around the core content component we want to render to the screen
import React, {Component} from "react"
import Toolbar from "../../components/Navigation/Toolbar/Toolbar"
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer"
import classes from "./Layout.module.css"

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
        <Toolbar openSideDrawer={this.sideDrawerOpenHandler}/>
        <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </> 
    )
  }
}

export default Layout