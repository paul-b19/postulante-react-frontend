import React, { Fragment } from 'react'

const Request = (props) => {


  return (
    <Fragment>
      <label>Request title</label>
      <ul className="nav nav-pills">
        <li className="nav-item">
          <div className="btn-group" role="group">
            <button id="btnGroupDrop1" type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true">{props.method}</button>
            <div className="dropdown-menu">
              <button onClick={props.handleMethod} className="dropdown-item" value="GET">GET</button>
              <button onClick={props.handleMethod} className="dropdown-item" value="POST">POST</button>
              <button onClick={props.handleMethod} className="dropdown-item" value="PUT">PUT</button>
              <button onClick={props.handleMethod} className="dropdown-item" value="PATCH">PATCH</button>
              <button onClick={props.handleMethod} className="dropdown-item" value="DELETE">DELETE</button>
            </div>
          </div>
        </li>
        <li className="nav-item">
          <div className="url-input">
            <input type="text" className="form-control" placeholder="url" id="url" />
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
                 onChange={props.handleTab} checked={props.tab === 'params'}
                 onClick={props.handleTab} />
          Params
        </label>
        <label className="btn btn-outline-primary">
          <input type="radio" name="tabs" value="authorization" 
                 onChange={props.handleTab} checked={props.tab === 'authorization'}
                 onClick={props.handleTab} />
          Authorization
        </label>
        <label className="btn btn-outline-primary">
          <input type="radio" name="tabs" value="headers" 
                 onChange={props.handleTab} checked={props.tab === 'headers'}
                 onClick={props.handleTab} />
          Headers
        </label>
        <label className="btn btn-outline-primary">
          <input type="radio" name="tabs" value="body" 
                 onChange={props.handleTab} checked={props.tab === 'body'}
                 onClick={props.handleTab} />
          Body
        </label>
      </div>
    </Fragment>
  )
}

export default Request