import React from 'react'
import Request from '../components/Request'

class RequestContainer extends React.Component {

  state = {
    view: 'params'
  }



  render () {

    return (
      <div className="reqCont">
        <h3>Request Container</h3>
        <Request />
      </div>
    )
  
  }


}

export default RequestContainer