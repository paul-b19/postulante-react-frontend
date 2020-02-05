import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { setRequestTitle, selectMethod, setUrl, switchRequestTab } from  '../actions'

const Request = (props) => {

  const handleUrl = e => {
    console.log(e.target.value)
    props.setUrl(e.target.value)
  }

  const handleMethod = e => {
    console.log(e.target.value)
    props.selectMethod(e.target.value)
  }

  const handleTab = e => {
    console.log(e.target.value)
    props.switchRequestTab(e.target.value)
  }

  return (
    <Fragment>
      <label>{props.requestTitle}</label>
      <ul className="nav nav-pills">
        <li className="nav-item">
          <div className="btn-group" role="group">
            <button id="btnGroupDrop1" type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true">{props.method}</button>
            <div className="dropdown-menu">
              <button onClick={handleMethod} className="dropdown-item" value="GET">GET</button>
              <button onClick={handleMethod} className="dropdown-item" value="POST">POST</button>
              <button onClick={handleMethod} className="dropdown-item" value="PUT">PUT</button>
              <button onClick={handleMethod} className="dropdown-item" value="PATCH">PATCH</button>
              <button onClick={handleMethod} className="dropdown-item" value="DELETE">DELETE</button>
            </div>
          </div>
        </li>
        <li className="nav-item">
          <div className="url-input">
            <input type="text" className="form-control" placeholder="url" id="url"
                   value={props.url} onChange={handleUrl} />
          </div>
        </li>
        <li className="nav-item">
          <button type="button" className="btn btn-outline-primary">Send</button>
        </li>
        <li className="nav-item">
          <button type="button" className="btn btn-outline-primary">Save</button>
        </li>
      </ul>

      <div className="btn-group btn-group-toggle" data-toggle="buttons">
        <label className="btn btn-outline-primary">
          <input type="radio" name="tabs" value="params" 
                 onChange={handleTab} checked={props.requestTab === 'params'}
                 onClick={handleTab} />
          Params
        </label>
        <label className="btn btn-outline-primary">
          <input type="radio" name="tabs" value="authorization" 
                 onChange={handleTab} checked={props.requestTab === 'authorization'}
                 onClick={handleTab} />
          Authorization
        </label>
        <label className="btn btn-outline-primary">
          <input type="radio" name="tabs" value="headers" 
                 onChange={handleTab} checked={props.requestTab === 'headers'}
                 onClick={handleTab} />
          Headers
        </label>
        <label className="btn btn-outline-primary">
          <input type="radio" name="tabs" value="body" 
                 onChange={handleTab} checked={props.requestTab === 'body'}
                 onClick={handleTab} />
          Body
        </label>
      </div>
    </Fragment>
  )
}

const mapStateToProps = state => {
  return {
    // userId: state.userId,
    // requestId: state.requestId,
    requestTitle: state.requestTitle,
    method: state.method,
    url: state.url,
    requestTab: state.requestTab
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // setRequestId: (data) => dispatch(setRequestId(data)),
    setRequestTitle: (data) => dispatch(setRequestTitle(data)),
    selectMethod: (data) => dispatch(selectMethod(data)),
    setUrl: (data) => dispatch(setUrl(data)),
    switchRequestTab: (data) => dispatch(switchRequestTab(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Request)