import React, { Fragment } from 'react'
import NavBar from '../components/NavBar'
import About from '../components/About'
import RequestContainer from '../containers/RequestContainer'
import ResponseContainer from '../containers/ResponseContainer'


class Application extends React.Component {
  


  render () {

    return(
      <Fragment>
        <div id="page-content-wrapper">
          <About />
          <NavBar />

          <RequestContainer />
          <ResponseContainer />

        </div>
      </Fragment>
    )
  }
}

export default Application