// Without uppercase because it is not used as JSX code
import React, {Component} from "react"
import Modal from "../../components/UI/Modal/Modal"

const withErrorHandler = (WrappedComponent, axios) =>  {
  return class extends Component { // anonymous class (no name) because we are using it only here
    state = {
      error:null
    }

    componentWillMount() { // It gets triggered before children get render. Otherwise we do not get an error message in the Burger component.
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({error: null})
        return req
      })
      this.resInterceptor = axios.interceptors.response.use(res => res, error => {
        this.setState({error: error})
      })
    }

    componentWillUnmount() {
      // Removes intercepstors to prevent memory leaks
      axios.interceptors.request.eject(this.reqInterceptor)
      axios.interceptors.response.eject(this.resInterceptor)
    }

    errorConfirmedHandler = () => {
      this.setState({error: null})
    }

    render() {
      return (
        <>
         <Modal show={this.state.error} close={this.errorConfirmedHandler}>
            {this.state.error ? this.state.error.message : null}
         </Modal>
         <WrappedComponent {...this.props}/>
        </>
      )
    }
  }
}

export default withErrorHandler