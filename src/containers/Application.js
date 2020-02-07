import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { setCollection, setRequestTitle, selectMethod, setUrl, updateAttribs, updateBodies } from '../actions'
import NavBar from '../components/NavBar'
import About from '../components/About'
import Response from '../components/Response'
import RequestContainer from './RequestContainer'


class Application extends React.Component {

  componentDidUpdate() {
    console.log('Application.js fetching request with id: ', this.props.requestId)

    // fetching request by ID and saving parts to Store
    // or resetting Store to default
    this.props.requestId ?
      fetch(`http://localhost:3000/requests/${this.props.requestId}`)
        .then(resp => resp.json())
        .then(data => {
          console.log(data)
          this.props.setRequestTitle(data.title)
          this.props.selectMethod(data.method)
          this.props.setUrl(data.url)
          this.props.updateAttribs(data.attribs)
          this.props.updateBodies(data.bodies)
          // setting collection for collection drop down
          this.props.setCollection(this.props.collections.find(collection => 
            collection.id == data.collection_id))
        })
    :
      this.props.setRequestTitle('Untitled')
      this.props.selectMethod('GET')
      this.props.setUrl('')
      this.props.updateAttribs([])
      this.props.updateBodies([])
  }
  
  render () {

    return(
      <Fragment>
        <div id="page-content-wrapper">
          <About />
          <NavBar />
          <RequestContainer />
          <Response />
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    // userId: state.userId,
    // method: state.method,
    collections: state.collections,
    requestId: state.requestId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setCollection: (data) => dispatch(setCollection(data)),
    setRequestTitle: (data) => dispatch(setRequestTitle(data)),
    selectMethod: (data) => dispatch(selectMethod(data)),
    setUrl: (data) => dispatch(setUrl(data)),
    updateAttribs: (data) => dispatch(updateAttribs(data)),
    updateBodies: (data) => dispatch(updateBodies(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Application)