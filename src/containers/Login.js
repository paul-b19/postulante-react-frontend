import React, { Fragment } from 'react'
import Logo from '../images/logo.png'

class LogIn extends React.Component {

  state = {
    login: true   // "login"/"signup"
  }

  handleForm = () => {
    this.setState({
      login: !this.state.login
    })
  }

  render() {

    let form
    if (this.state.login) {
      form = <Fragment>
        <div className="form-group">
          <label className="col-form-label">Username</label>
          <input type="text" className="form-control" name="username"
                 onChange={this.props.handleForm} value={this.props.username}/>
        </div>
  
        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" name="password" 
                 onChange={this.props.handleForm} value={this.props.password}/>
        </div>

        <div className="form-group">
          <button type="button" className="btn btn-primary" onClick={this.props.logIn}>Log In</button>
          <button type="button" className="btn btn-primary" onClick={this.handleForm}>Create account</button>
        </div>
      </Fragment>
    } else {
      form = <Fragment>
        <div className="form-group">
          <label className="col-form-label">Username</label>
          <input type="text" className="form-control" name="username"
                 onChange={this.props.handleForm} value={this.props.username}/>
        </div>

        {/* <div className="form-group has-danger">
          <label className="form-control-label">Username</label>
          <input type="text" className="form-control is-invalid" name="username"
                 onChange={this.props.handleForm} value={this.props.username}/>
          <div className="invalid-feedback">Sorry, that username's taken. Try another</div>
        </div> */}
  
        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" name="password" 
                 onChange={this.props.handleForm} value={this.props.password}/>
        </div>

        <div className="form-group">
            <label>Confirm password</label>
            <input type="password" className="form-control" name="passwordConf" 
                   onChange={this.props.handleForm} value={this.props.confirmPassword}/>
        </div>

        <div className="form-group">
          <button type="button" className="btn btn-primary" onClick={this.props.signUp}>Submit</button>
          <button type="button" className="btn btn-primary" onClick={this.handleForm}>Back to login</button>
        </div>
      </Fragment>
    }

    return(
      <div className="login">
        <div className="login-container">
          <div>
            <img className="login-logo" src={Logo} alt='Logo'/>
          </div>

          {form}
    
        </div>
      </div>
    )
  }
}

export default LogIn