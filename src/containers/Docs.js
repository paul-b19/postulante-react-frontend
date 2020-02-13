import React from 'react'
import { connect } from 'react-redux'
import { setUserId } from  '../actions'
import NavBar from '../components/NavBar'
import logo from '../images/logo_sq.png'

class Docs extends React.Component {

  // state = {
  //   username: '',
  //   password: '',
  //   passwordConf: '',
  //   login: true   // "login"/"signup"
  // }

  render() {

    return(
      <div className="login">
        <NavBar />
        <div className="login-container">
          <div>
            <img className="login-logo" src={logo} alt='logo'/>
          </div>
          <h3>Docs</h3>
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
    setUserId: (data) => dispatch(setUserId(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Docs)