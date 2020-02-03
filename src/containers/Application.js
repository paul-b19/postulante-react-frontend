import React, { Fragment } from 'react'
import NavBar from '../components/NavBar'
import About from '../components/About'
import Response from '../components/Response'
import RequestContainer from './RequestContainer'


class Application extends React.Component {
  


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

export default Application