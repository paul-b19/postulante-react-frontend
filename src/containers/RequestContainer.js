import React from 'react'
import Request from '../components/Request'
import Params from '../components/Params'
import Auth from '../components/Auth'
import Headers from '../components/Headers'
import Body from '../components/Body'

class RequestContainer extends React.Component {

  state = {
    method: 'GET', // 'POST'/'PUT'/'PATCH'/'DELETE'
    tab: 'params' // 'authorization'/'headers'/'body'
  }

  handleMethod = (e) => {
    console.log(e.target.value)
    this.setState({
      method: e.target.value
    })
  }

  handleTab = (e) => {
    console.log(e.target.value)
    this.setState({
      tab: e.target.value
    })
  }


  render () {
 
    let tab
    switch (this.state.tab) {
      case 'params':
        tab = <Params />
        break;
      case 'authorization':
        tab = <Auth />
        break;
      case 'headers':
        tab = <Headers />
        break;
      case 'body':
        tab = <Body />
        break;
    } 

    return (
      <div className="reqCont">
        <h3>Request Container</h3>
        <Request handleMethod={this.handleMethod}
                 method={this.state.method}
                 handleTab={this.handleTab}
                 tab={this.state.tab}/>
        {tab}
      </div>
    )
  
  }


}

export default RequestContainer