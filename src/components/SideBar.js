import React from 'react'
import Logo from '../images/logo_sb.png'

const SideBar  = (props) => {

  return (
    <div className="bg-primary border-right" id="sidebar-wrapper">
      <div className="sidebar-heading">
        <img className="logo-sidebar" src={Logo} alt='Logo'/>
      </div>
      <input className="form-control mr-sm-2" type="text" placeholder="Filter"
                 value={props.searchValue}
                 onChange={props.handleSearch} />
      <div className="list-group list-group-flush">
        <a href="#" className="list-group-item list-group-item-action bg-light">Collection 1</a>
        <a href="#" className="list-group-item list-group-item-action bg-light">Collection 2</a>
        <a href="#" className="list-group-item list-group-item-action bg-light">Collection 3</a>
        <a href="#" className="list-group-item list-group-item-action bg-light">Collection 4</a>
        <a href="#" className="list-group-item list-group-item-action bg-light">Collection 5</a>
      </div>
    </div>
  )
}

export default SideBar