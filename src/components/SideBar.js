import React from 'react'
import { connect } from 'react-redux'
import { updateCollections, setCollection, updateRequests, 
         updateSearch, setRequestId } from  '../actions'
import Logo from '../images/logo_sb.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class SideBar extends React.Component {

  state = {
    newCollection: false,
    collectionName: 'New Collection'
  }

  componentDidMount() {
    fetch(`${process.env.REACT_APP_BASE_URL}/users/${this.props.userId}`)
      .then(resp => resp.json())
      .then(data => {
        this.props.updateCollections(data.collections)
        this.props.collections && this.props.setCollection(this.props.collections.find(i => i))
        this.props.updateRequests(data.requests)
      })
  }

  handleSearch = e => {
    this.props.updateSearch(e.target.value)
  }

  handleNewCollection = () => {
    this.setState({
      newCollection: true
    })
  }

  handleCancelCollection = () => {
    this.setState({
      newCollection: false
    })
  }

  handleDeleteCollection = (collection) => {
    fetch(`${process.env.REACT_APP_BASE_URL}/collections/${collection.id}`, {
      method: 'DELETE'
    })
      .then(() => {
        fetch(`${process.env.REACT_APP_BASE_URL}/users/${this.props.userId}`)
          .then(resp => resp.json())
          .then(data => {
            this.props.updateCollections(data.collections)
            this.props.setCollection(this.props.collections.find(i => i))
            this.props.updateRequests(data.requests)
          })
      })
  }

  handleCollectionName = e => {
    this.setState({
      collectionName: e.target.value
    })
  }

  handleCreateCollection = () => {
    fetch(`${process.env.REACT_APP_BASE_URL}/collections`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "name": this.state.collectionName,
        "user_id": this.props.userId
      })
    })
      .then(() => {
        fetch(`${process.env.REACT_APP_BASE_URL}/users/${this.props.userId}`)
          .then(resp => resp.json())
          .then(data => {
            this.props.updateCollections(data.collections)
            this.props.setCollection(this.props.collections.find(i => i))
            this.props.updateRequests(data.requests)
          })
      })
    
    this.setState({
      newCollection: false,
      collectionName: 'New Collection'
    })
  }

  handleRequestId = e => {
    this.props.setRequestId(e.target.id)
  }

  render() {

    return (
      <div className="bg-primary border-right" id="sidebar-wrapper">
        <div className="sidebar-heading">
          <img className="logo-sidebar" src={Logo} alt='Logo'/>
        </div>
        <input className="form-control mr-sm-2" type="text" placeholder="🔍 Search by title"
               value={this.props.searchValue}
               onChange={this.handleSearch} />

        {/*** conditional rendering - search/collections ***/}
        {this.props.searchValue && this.props.searchValue !== '' ?
          <div className="list-group-flush" role="tabpanel" aria-labelledby="heading">
            {this.props.requests.length && this.props.requests.map(request =>
              request.title.toLowerCase().startsWith(this.props.searchValue.toLowerCase()) &&
              <a key={request.id} id={request.id} href="#" onClick={this.handleRequestId} 
                 className="list-group-item list-group-item-action bg-light">
                {request.title}
              </a>
            )}
          </div>
        :
          <div>
            {/***  creating New Collection  ***/}
            {!this.state.newCollection ? 
              <button onClick={this.handleNewCollection} type="button" className="btn btn-primary btn-block text-left">
                <FontAwesomeIcon icon="plus" /> New Collection
              </button>
            :
              <div className="input-group">
                <input type="text" className="form-control" placeholder="New Collection" 
                       value={this.state.collectionName} onChange={this.handleCollectionName} />
                <span className="input-group-btn">
                  <button onClick={this.handleCreateCollection} className="btn btn-primary" type="button">
                    <FontAwesomeIcon icon="check" />
                  </button>
                  <button onClick={this.handleCancelCollection} className="btn btn-primary" type="button">
                    <FontAwesomeIcon icon="times" />
                  </button>
                </span>
              </div>
            }

            {/***  requests collections  ***/}
            <div id="accordion" role="tablist" aria-multiselectable="true">
              {this.props.collections && this.props.collections.length && this.props.collections.map((collection, idx) =>
                <div className="card" key={idx}>
                  <h6 className="card-header" role="tab">
                    <a href="#"><FontAwesomeIcon onClick={() => this.handleDeleteCollection(collection)} icon="trash-alt" /></a>
                    <a data-toggle="collapse" data-parent="#accordion" href={`#collapse${idx}`} aria-expanded="false" aria-controls={`collapse${idx}`} className="collection collapsed">
                      {` ${collection.name}`} <FontAwesomeIcon icon="chevron-down" className="chevron-down float-right" />
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
    collection: state.collection,
    requests: state.requests,
    searchValue: state.searchValue
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateCollections: (data) => dispatch(updateCollections(data)),
    setCollection: (data) => dispatch(setCollection(data)),
    updateRequests: (data) => dispatch(updateRequests(data)),
    updateSearch: (data) => dispatch(updateSearch(data)),
    setRequestId: (data) => dispatch(setRequestId(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideBar)