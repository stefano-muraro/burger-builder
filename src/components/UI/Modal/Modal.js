import React, {Component} from "react"
import classes from "./Modal.module.css"
import Backdrop from "../Backdrop/Backdrop"

class Modal extends Component { // Se utiliza class para poner usar los lifecycle methods.
  // No actualiza si Modal está oculto. Mejora performance.
  // Esto afecta también al componente OrderSummary porque es hijo.
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show || this.props.show
  }

  render() {
    return (
      <>
        <Backdrop show={this.props.show} clicked={this.props.close}/>
        <div 
          className={classes.Modal} 
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0"
            }}>
          {this.props.children}
        </div>
      </>
    )
  }
} 

export default Modal