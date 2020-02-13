import React from 'react'
import { connect } from 'react-redux'
import { setUserId, setComponent } from  '../actions'
import NavBar from '../components/NavBar'
import logo from '../images/logo_sq.png'

class SignUp extends React.Component {

  state = {
    username: '',
    password: '',
    passwordConf: ''
  }

  componentDidMount() {
    localStorage.userId && this.props.setUserId(localStorage.userId)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      this.props.history.push('/account')
    }
  }

  handleChange = e => {
    console.log(e.target.value)
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    console.log('submit')
    if (this.state.password === this.state.passwordConf) {
      fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password
        })
      })
      .then(resp => resp.json())
      .then(response => {
        if (response.errors) {
          alert(response.errors)
        } else {
          this.props.setUserId(response.id)
          localStorage.userId = response.id
          this.props.setComponent('account')
        }
      }) 
    } else {
      alert("Passwords don't match!")
    }
  }

  handleSwitch = () => {
    this.props.setComponent('login')
    this.props.history.push('/')
  }

  render() {

    return(
      <div className="login">
        <NavBar />
        <div className="login-container d-inline-flex row">
          <div className="p-0 pb-3 text-center col-12">
            <img className="login-logo" src={logo} alt='logo'/>
          </div>

          <div className="form-group mb-2 col-12">
            <label className="col-form-label">Username</label>
            <input type="text" className="form-control" name="username"
                   onChange={this.handleChange} value={this.state.username}/>
          </div>
    
          <div className="form-group mb-2 col-12">
            <label className="col-form-label">Password</label>
            <input type="password" className="form-control" name="password" 
                   onChange={this.handleChange} value={this.state.password}/>
          </div>

          <div className="form-group mb-4 col-12">
            <label className="col-form-label">Confirm password</label>
            <input type="password" className="form-control" name="passwordConf" 
                   onChange={this.handleChange} value={this.state.passwordConf}/>
          </div>
  
          <div className="form-group text-center col-12">
            <button type="button" className="btn btn-primary mx-2" onClick={this.handleSubmit}>Submit</button>
            <button type="button" className="btn btn-primary mx-2" onClick={this.handleSwitch}>Back to Log In</button>
          </div>
    
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    userId: state.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setComponent: (data) => dispatch(setComponent(data)),
    setUserId: (data) => dispatch(setUserId(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp)