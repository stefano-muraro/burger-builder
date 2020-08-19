import React from "react"
import Logo from "../../Logo/Logo"
import NavigationItems from "../NavigationItems/NavigationItems"
import classes from "./Toolbar.module.css"
import classesMenu from "./MenuButton.module.css"


const toolbar = (props) => (
  <header className={classes.Toolbar}>
    <div onClick={props.openSideDrawer} className={classesMenu.MenuButton}>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div className={classes.Logo}>
        <Logo/>
    </div>
    <nav className={classes.DesktopOnly}>
      <NavigationItems isAuthenticated={props.isAuth}/>
    </nav>
  </header>
)

export default toolbar