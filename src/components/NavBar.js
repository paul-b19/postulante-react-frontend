import React from 'react'
import $ from 'jquery'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const NavBar  = (props) => {

  const handleSidebar = (e) => {
      e.preventDefault()
      $("#wrapper").toggleClass("toggled")
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary border-bottom">  {/*class="fixed-top border-bottom"*/}
      <button onClick={handleSidebar} className="btn btn-primary" id="menu-toggle">
        <FontAwesomeIcon icon="exchange-alt" /> Collections Menu
      </button>

      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
    
      <div className="collapse navbar-collapse" id="navbarColor01">
        <ul className="navbar-nav mr-auto">     {/*class="navbar-nav ml-auto mt-2 mt-lg-0"*/}
          <li className="nav-item">
            <a className="nav-link" href="#">
              <h6 className="mb-0"><FontAwesomeIcon icon="code" /> Documentation</h6>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#" data-toggle="modal" data-target="#about">
              <h6 className="mb-0"><FontAwesomeIcon icon="question-circle" /> About</h6>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#" onClick={props.logOut}>
              <h6 className="mb-0"><FontAwesomeIcon icon="sign-out-alt" /> Log Out</h6>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default NavBar