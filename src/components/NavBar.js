import React from 'react'
import $ from 'jquery'


const NavBar  = (props) => {

  const handleSidebar = (e) => {
      e.preventDefault()
      $("#wrapper").toggleClass("toggled")
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary border-bottom">  {/*class="fixed-top border-bottom"*/}
      <button onClick={handleSidebar} className="btn btn-primary" id="menu-toggle">Toggle Menu</button>

      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
    
      <div className="collapse navbar-collapse" id="navbarColor01">
        <ul className="navbar-nav mr-auto">     {/*class="navbar-nav ml-auto mt-2 mt-lg-0"*/}
          <li className="nav-item">
            <a className="nav-link" href="#">Documentation</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#" data-toggle="modal" data-target="#about">About</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="" onClick = {props.logOut}>Log Out</a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default NavBar