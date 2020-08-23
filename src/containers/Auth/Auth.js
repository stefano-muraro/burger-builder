import React, {Component} from 'react'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import classes from './Auth.module.css'
import {connect} from 'react-redux'
import * as actions from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'
import {Redirect} from 'react-router-dom'
import {updateObject, checkValidation} from '../../shared/utility'

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "E-mail adress"
        },
        value: "",
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password"
        },
        value: "",
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    isSignup: true
  }

  componentDidMount() {
    if(this.props.buildingBurger) {
      this.props.onSetAuthRedirectPath('/checkout')
    } else {
      this.props.onSetAuthRedirectPath('/')
    }
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControl = updateObject(this.state.controls[controlName], {
      value: event.target.value,
      valid: checkValidation(event.target.value, this.state.controls[controlName].validation),
      touched: true
    })
    const updatedControls = updateObject(this.state.controls, {
      [controlName]: updatedControl
    })
    this.setState({controls: updatedControls})
  }

  submitHandler = (event) => {
    event.preventDefault() // to avoid reloading
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup)
  }

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {isSignup: !prevState.isSignup}
    })
  }

  render() {
    const formElementArray = []
    for (let key in this.state.controls) {
      formElementArray.push({
        id: key,
        config: this.state.controls[key]
      })
    }

    const form = formElementArray.map(formElement => (
        <Input
          key={formElement.id}
          label={formElement.id}
          elementType={formElement.config.elementType} 
          elementConfig={formElement.config.elementConfig} 
          value={formElement.config.value} 
          valid={formElement.config.valid}
          touched={formElement.config.touched}
          changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
    ))

    return (
      <div className={classes.Auth}>
        {this.props.isAuthenticated? <Redirect to={this.props.authRedirectPath}/> : null}
        {this.props.error? this.props.error.message : null}
        <form onSubmit={this.submitHandler}>
          {this.props.loading? <Spinner/> : form}
          <Button btnType='Success'>Submit</Button> 
        </form>
        <Button btnType='Danger' clicked={this.switchAuthModeHandler}>Switch to {this.state.isSignup? 'Sign In' : 'Sign Up'}</Button>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignup) => {dispatch(actions.auth(email, password, isSignup))},
    onSetAuthRedirectPath: (path) => {dispatch(actions.setAuthRedirectPath(path))}
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.auth.error,
    loading: state.auth.loading,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)