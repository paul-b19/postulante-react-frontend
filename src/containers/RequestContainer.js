import React from 'react'
import { connect } from 'react-redux'
import { switchRequestTab } from '../actions'
import Request from '../components/Request'
import Params from '../components/Params'
import Auth from '../components/Auth'
import Headers from '../components/Headers'
import Body from '../components/Body'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class RequestContainer extends React.Component {

  state = {
    // method: 'GET', // 'POST'/'PUT'/'PATCH'/'DELETE'
    // tab: 'params' // 'authorization'/'headers'/'body'
    titleEdit: false
  }

  handleTitleEdit = () => {
    console.log('title edit')
    this.setState({
      titleEdit: !this.state.titleEdit
    })
  }

  render () {

    let tab
    switch (this.props.requestTab) {
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
        <h3><FontAwesomeIcon icon="quote-left" /> Request</h3>
        <Request titleEdit={this.state.titleEdit}
                 handleTitleEdit={this.handleTitleEdit} />
        {tab}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    // userId: state.userId,
    // requestId: state.requestId,
    // method: state.method,
    requestTab: state.requestTab
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // setRequestId: (data) => dispatch(setRequestId(data)),
    // selectMethod: (data) => dispatch(selectMethod(data)),
    switchRequestTab: (data) => dispatch(switchRequestTab(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RequestContainer)
