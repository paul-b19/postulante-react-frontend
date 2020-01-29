import React from 'react'
import Request from '../components/Request'

class RequestContainer extends React.Component {

  state = {
    tab: 'params' // 'authorization'/'headers'/'body'
  }

  handleTabChange = (e) => {
    console.log(e.target.name)
    this.setState({
      tab: e.target.name
    })
  }


  render () {

    return (
      <div className="reqCont">
        <h3>Request Container</h3>
        <Request handleTabChange={this.handleTabChange}
                 tab={this.state.tab}/>
      </div>
    )
  
  }


}

export default RequestContainer