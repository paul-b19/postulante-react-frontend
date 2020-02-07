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
    fetch(`http://localhost:3000/users/${this.props.userId}`)
      .then(resp => resp.json())
      .then(data => {
        console.log(data)
        this.props.updateCollections(data.collections)
        this.props.setCollection(this.props.collections.find(i => i))
        this.props.updateRequests(data.requests)
      })
  }

  handleSearch = e => {
    console.log('search', e.target.value)
    this.props.updateSearch(e.target.value)
  }

  handleNewCollection = () => {
    this.setState({
      newCollection: true
    })
  }

  handleCollectionName = e => {
    console.log(e.target.value)
    this.setState({
      collectionName: e.target.value
    })
  }

  handleCreateCollection = () => {
    fetch('http://localhost:3000/collections', {
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
        fetch(`http://localhost:3000/users/${this.props.userId}`)
          .then(resp => resp.json())
          .then(data => {
            console.log(data)
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
          <div>
            {/***  creating New Collection  ***/}
            {!this.state.newCollection ? 
              <h5 onClick={this.handleNewCollection}>✚ New Collection</h5>
            :
              <div className="input-group">
                <div className="title-input">
                  <input type="text" className="form-control" id="requestTitle"
                         value={this.state.collectionName} onChange={this.handleCollectionName} />
                </div>
                <div className="input-group-append">
                  <span onClick={this.handleCreateCollection} className="input-group-text">✓</span>
                </div>
              </div>
            }

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