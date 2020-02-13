import React, { Fragment } from 'react'
import{ connect } from 'react-redux'
import { setUserId, setComponent } from '../actions'
import $ from 'jquery'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import About from './About'


const NavBar  = (props) => {

  const handleSidebar = e => {
      e.preventDefault()
      $("#wrapper").toggleClass("toggled")
  }

  const handleLogOut = () => {
    props.setUserId(null)
    props.setComponent('login')
    localStorage.removeItem('userId')
  }

  const logInOut = () => {
    if (props.component === 'account') {
      return (
        <a className="nav-link" href="/" onClick={handleLogOut}>
          <h6 className="mb-0"><FontAwesomeIcon icon="sign-out-alt" /> Log Out</h6>
        </a>
      )
    } else if (props.component === 'login') {
      return (
        <a className="nav-link" href="/signup" onClick={props.setComponent('signup')}>
          <h6 className="mb-0"><FontAwesomeIcon icon="user" /> Create Account</h6>
        </a>
      )
    } else if (props.component === 'signup') {
      return (
        <a className="nav-link" href="/login" onClick={props.setComponent('login')}>
          <h6 className="mb-0"><FontAwesomeIcon icon="sign-in-alt" /> Log In</h6>
        </a>
      )
    }
  }

  return (
    <Fragment>
      <About />
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary border-bottom">
        {props.component === 'account' && 
        <button onClick={handleSidebar} className="btn btn-primary" id="menu-toggle">
          <FontAwesomeIcon icon="exchange-alt" /> Collections Menu
        </button>
        }
  
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
      
        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a className="nav-link" href="/docs">
                <h6 className="mb-0"><FontAwesomeIcon icon="code" /> Documentation</h6>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" data-toggle="modal" data-target="#about">
                <h6 className="mb-0"><FontAwesomeIcon icon="question-circle" /> About</h6>
              </a>
            </li>
            <li className="nav-item">
              {logInOut()}
            </li>
          </ul>
        </div>
      </nav>
    </Fragment>
  )
}

const mapStateToProps = state => {
  return {
    component: state.component,
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
)(NavBar)