import React from 'react'
// import '../css/bootstrap.min.css'
// import '../css/custom.css'
// import Logo from '../images/logo.png'

const SideBar  = (props) => {

  return (
    <div className="bg-primary border-right" id="sidebar-wrapper">
      <div className="sidebar-heading">
        <img className="" src="{Logo}" alt='Logo'/>  {/*className="logo-navbar"*/}
      </div>
      <input className="form-control mr-sm-2" type="text" placeholder="Filter"
                 value={props.searchValue}
                 onChange={props.handleSearch} />
      <div className="list-group list-group-flush">
        <a href="#" className="list-group-item list-group-item-action bg-light">Dashboard</a>
        <a href="#" className="list-group-item list-group-item-action bg-light">Shortcuts</a>
        <a href="#" className="list-group-item list-group-item-action bg-light">Overview</a>
        <a href="#" className="list-group-item list-group-item-action bg-light">Events</a>
        <a href="#" className="list-group-item list-group-item-action bg-light">Profile</a>
        <a href="#" className="list-group-item list-group-item-action bg-light">Status</a>
      </div>
    </div>
  )
}

export default SideBar