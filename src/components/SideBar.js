import React from 'react'
import { connect } from 'react-redux'
import { updateCollections, updateRequests, updateSearch, setRequestId } from  '../actions'
import Logo from '../images/logo_sb.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class SideBar extends React.Component {

  // state = {
  //   searchValue: ''
  // }

  componentDidMount() {
    fetch(`http://localhost:3000/users/${this.props.userId}`)
      .then(resp => resp.json())
      .then(data => {
        console.log(data)
        this.props.updateCollections(data.collections)
        this.props.updateRequests(data.requests)
      })
  }

  handleSearch = e => {
    console.log('search', e.target.value)
    this.props.updateSearch(e.target.value)
  }

  handleRequestId = e => {
    console.log('set request id: ', e.target.id)
    this.props.setRequestId(e.target.id)
  }

  render() {

    return (
      <div className="bg-primary border-right" id="sidebar-wrapper">
        <div className="sidebar-heading">
          <img className="logo-sidebar" src={Logo} alt='Logo'/>
        </div>
        <input className="form-control mr-sm-2" type="text" placeholder="Filter"
               value={this.props.searchValue}
               onChange={this.handleSearch} />

        {/*** conditional rendering - search/collections ***/}
        {this.props.searchValue && this.props.searchValue !== '' ?
          <div className="list-group-flush" role="tabpanel" aria-labelledby="heading">
            {this.props.requests.length && this.props.requests.map(request =>
              request.title.startsWith(this.props.searchValue) &&
              <a key={request.id} id={request.id} href="#" onClick={this.handleRequestId} 
                 className="list-group-item list-group-item-action bg-light">
                {request.title}
              </a>
            )}
          </div>
        :
          <div id="accordion" role="tablist" aria-multiselectable="true">
            {this.props.collections.length && this.props.collections.map((collection, idx) =>
              <div className="card" key={idx}>
                <h6 className="card-header" role="tab">
                  <a data-toggle="collapse" data-parent="#accordion" href={`#collapse${idx}`} aria-expanded="false" aria-controls={`collapse${idx}`} className="collection collapsed">
                    {collection.name} <FontAwesomeIcon icon="chevron-down" className="chevron-down pull-right" />
                  </a>
                </h6>
                <div id={`collapse${idx}`} className="list-group-flush collapse" role="tabpanel" aria-labelledby={`heading${idx}`}>
                  {this.props.requests.length && this.props.requests.map(request => 
                    request.collection_id === collection.id &&
                    <a key={request.id} id={request.id} href="#" onClick={this.handleRequestId} 
                       className="list-group-item list-group-item-action bg-light">
                      {request.title}
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        }
      </div>
    )
  }
}

// export default connect(state => 
//   ({ userId: state.userId,
//      collections: state.collections,
//      requests: state.requests }),
//   { updateCollections, updateRequests }
// )(SideBar)

const mapStateToProps = state => {
  return {
    userId: state.userId,
    collections: state.collections,
    requests: state.requests,
    searchValue: state.searchValue
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateCollections: (data) => dispatch(updateCollections(data)),
    updateRequests: (data) => dispatch(updateRequests(data)),
    updateSearch: (data) => dispatch(updateSearch(data)),
    setRequestId: (data) => dispatch(setRequestId(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideBar)