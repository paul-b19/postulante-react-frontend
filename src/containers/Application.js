import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { setCollection, setRequestTitle, selectMethod, setUrl, 
         updateAttribs, updateBodies, updateResponse, 
         updateResponseStatus, updateResponseStatusText } from '../actions'
import SideBar from '../components/SideBar'
import NavBar from '../components/NavBar'
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
          this.props.updateResponse('Response will be rendered here')
          this.props.updateResponseStatus(null)
          this.props.updateResponseStatusText(null)
        })
    :
      this.props.setRequestTitle('Untitled')
      this.props.selectMethod('GET')
      this.props.setUrl('')
      this.props.updateAttribs([])
      this.props.updateBodies([])
      this.props.updateResponse('Response will be rendered here')
      this.props.updateResponseStatus(null)
      this.props.updateResponseStatusText(null)
  }
  
  render () {

    return(
      <Fragment>
        <div className="d-flex" id="wrapper">
          <SideBar />
          <div id="page-content-wrapper">
            <NavBar />
            <RequestContainer />
            <Response />
          </div>
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
    updateBodies: (data) => dispatch(updateBodies(data)),
    updateResponse: (data) => dispatch(updateResponse(data)),
    updateResponseStatus: (data) => dispatch(updateResponseStatus(data)),
    updateResponseStatusText: (data) => dispatch(updateResponseStatusText(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Application)