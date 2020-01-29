import React, { Fragment } from 'react'

const Request = (props) => {


  return (
    <Fragment>
      <div className="">

      </div>
      <label>Request title</label>
      <ul className="nav nav-pills">
        <li className="nav-item">
          <div className="btn-group" role="group" aria-label="Button group with nested dropdown">
            <button type="button" className="btn btn-primary">GET</button>
            <div className="btn-group" role="group">
              <button id="btnGroupDrop1" type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
              <div className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                <a className="dropdown-item" href="#">GET</a>
                <a className="dropdown-item" href="#">POST</a>
                <a className="dropdown-item" href="#">PUT</a>
                <a className="dropdown-item" href="#">PATCH</a>
                <a className="dropdown-item" href="#">DELETE</a>
              </div>
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
          <input type="radio" name="params" autocomplete="off" checked="true" /> Params
        </label>
        <label className="btn btn-outline-primary">
          <input type="radio" name="authorization" autocomplete="off" /> Authorization
        </label>
        <label className="btn btn-outline-primary">
          <input type="radio" name="headers" autocomplete="off" /> Headers
        </label>
        <label className="btn btn-outline-primary">
          <input type="radio" name="body" autocomplete="off" /> Body
        </label>
      </div>

    </Fragment>
  )
}

export default Request