import React, { Fragment } from 'react'
// import '../css/bootstrap.min.css'
// import '../css/custom.css'
import NavBar from '../components/NavBar'
import About from '../components/About'


class Application extends React.Component {
  


  render () {

    return(
      <Fragment>
        <div id="page-content-wrapper">
          <About />
          <NavBar />
    

    
          <div className="container-fluid">
            <h1 className="mt-4">Dashboard Container</h1>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default Application