import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { setRequestTitle, selectMethod, setUrl } from '../actions'
import NavBar from '../components/NavBar'
import About from '../components/About'
import Response from '../components/Response'
import RequestContainer from './RequestContainer'


class Application extends React.Component {

  componentDidUpdate() {
    console.log('Application.js fetching request with id: ', this.props.requestId)

    fetch(`http://localhost:3000/requests/${this.props.requestId}`)
      .then(resp => resp.json())
      .then(data => {
        console.log(data)
        this.props.setRequestTitle(data.title)
        this.props.selectMethod(data.method)
        this.props.setUrl(data.url)
      })
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
    requestId: state.requestId,
    // method: state.method
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setRequestTitle: (data) => dispatch(setRequestTitle(data)),
    selectMethod: (data) => dispatch(selectMethod(data)),
    setUrl: (data) => dispatch(setUrl(data)),
    
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Application)