import React from 'react'
import Logo from '../images/logo_sb.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class SideBar extends React.Component {

  state = {
    collections: [],
    searchValue: ''
  }

  componentDidMount() {
    fetch('http://localhost:3000/collections')
      .then(resp => resp.json())
      .then(data => {
        console.log(data)
        this.setState({
          collections: data
        })
      })
  }
  

  handleSearch = e => {
    console.log('search', e.target.value)
    this.setState({
      searchValue: e.target.value
    })
  }

  render() {
    
    return (
      <div className="bg-primary border-right" id="sidebar-wrapper">
        <div className="sidebar-heading">
          <img className="logo-sidebar" src={Logo} alt='Logo'/>
        </div>
        <input className="form-control mr-sm-2" type="text" placeholder="Filter"
               value={this.state.searchValue}
               onChange={this.handleSearch} />
        <div id="accordion" role="tablist" aria-multiselectable="true">
  
          {this.state.collections.map((collection, idx) =>
            <div className="card" key={idx}>
              <h6 className="card-header" role="tab">
                <a data-toggle="collapse" data-parent="#accordion" href={`#collapse${idx}`} aria-expanded="false" aria-controls={`collapse${idx}`} className="collection collapsed">
                  {collection.name} <FontAwesomeIcon icon="chevron-down" className="chevron-down pull-right" />
                </a>
              </h6>
          
              <div id={`collapse${idx}`} className="list-group-flush collapse" role="tabpanel" aria-labelledby={`heading${idx}`}>
                <a href="#" className="list-group-item list-group-item-action bg-light">GET Request</a>
                <a href="#" className="list-group-item list-group-item-action bg-light">POST Request</a>
                <a href="#" className="list-group-item list-group-item-action bg-light">PUT Request</a>
                <a href="#" className="list-group-item list-group-item-action bg-light">PATCH Request</a>
                <a href="#" className="list-group-item list-group-item-action bg-light">DELETE Request</a>
              </div>
            </div>
          )}
  
        </div>
      </div>
    )
  }
}

export default SideBar