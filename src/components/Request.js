import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { setCollection, updateRequests, setRequestId, setRequestTitle, 
         selectMethod, setUrl, switchRequestTab, updateAttribs, 
         updateBodies, updateResponse, updateResponseStatus, 
         updateResponseStatusText } from  '../actions'
import dJSON from 'dirty-json'

const Request = (props) => {

  const handleCollection = e => {
    props.setCollection(JSON.parse(e.target.value))
  }

  // resetting Store state to default values
  const handleNewRequest = () => {
    props.setRequestId(null)
  }

  const handleRequestTitle = e => {
    props.setRequestTitle(e.target.value)
  }

  const handleUrl = e => {
    props.setUrl(e.target.value)
  }

  const handleMethod = e => {
    props.selectMethod(e.target.value)
  }

  // switching tabs Params/Auth/Headers/Body
  const handleTab = e => {
    props.switchRequestTab(e.target.value)
  }

  // creating new request or updating existing one (called on Save button click)
  const handleSave = () => {
    props.requestId ?
      updateRequest(props.requestId)
    :
      createRequest()
  }

  // creating new request (called from handleSave)
  const createRequest = () => {
    fetch(`${process.env.REACT_APP_BASE_URL}/requests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "title": props.requestTitle,
        "method": props.method,
        "url": props.url,
        "collection_id": props.collection.id
      })
    })
      .then(resp => resp.json())
      .then(data => {
        updateReqAttribs(data.id)
        updateReqBodies(data.id)
        setTimeout(() => { 
          props.setRequestId(data.id)
        }, 1000)
        // props.setRequestId(data.id) // <-- ????
        props.updateRequests([...props.requests, data])
      })
  }
  
  // updating existing request (called from handleSave)
  const updateRequest = (reqId) => {
    // updating requests Attribs and Bodies
    updateReqAttribs(reqId)
    updateReqBodies(reqId)
    // updating request
    fetch(`${process.env.REACT_APP_BASE_URL}/requests/${reqId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "title": props.requestTitle,
        "method": props.method,
        "url": props.url,
        "collection_id": props.collection.id
      })
    })
      .then(resp => resp.json())
      .then(data => {
        let updRequests = [...props.requests].map(req => {
          return req.id == reqId ? data : req}) // <-- integer vs string
        props.updateRequests(updRequests)

        setTimeout(() => { 
          props.setRequestId(reqId)
        }, 1000)
        // props.setRequestId(reqId)   // <-- ????
      })
  }

  // updating request attribs (called from updateRequest() or createRequest())
  const updateReqAttribs = (reqId) => {
    props.attribs.forEach(attrib => {
      // updating attrib
      if (attrib.request_id && !attrib.for_deletion) {
        fetch(`${process.env.REACT_APP_BASE_URL}/attribs/${attrib.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "id": attrib.id,
            "attr_type": attrib.attr_type,
            "key": attrib.key,
            "value": attrib.value,
            "description": attrib.description,
            "request_id": reqId
          })
        })
      // creating attrib
      } else if (!attrib.request_id && !attrib.for_deletion) {
        fetch(`${process.env.REACT_APP_BASE_URL}/attribs/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "attr_type": attrib.attr_type,
            "key": attrib.key,
            "value": attrib.value,
            "description": attrib.description,
            "request_id": reqId
          })
        })
      // deleting attrib
      } else if (attrib.for_deletion) {
        fetch(`${process.env.REACT_APP_BASE_URL}/attribs/${attrib.id}`, {
          method: 'DELETE'
        })
      }
    })
  }

  // updating request bodies (called from updateRequest() or createRequest())
  const updateReqBodies = (reqId) => {
    props.bodies.forEach(body => {
      // updating body
      if (body.request_id && !body.for_deletion) {
        fetch(`${process.env.REACT_APP_BASE_URL}/bodies/${body.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "id": body.id,
            "body_type": body.body_type,
            "key": body.key,
            "value": body.value,
            "description": body.description,
            "raw_body": body.raw_body,
            "request_id": reqId
          })
        })
      // creating body
      } else if (!body.request_id && !body.for_deletion) {
        fetch(`${process.env.REACT_APP_BASE_URL}/bodies/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "body_type": body.body_type,
            "key": body.key,
            "value": body.value,
            "description": body.description,
            "raw_body": body.raw_body,
            "request_id": reqId
          })
        })
      // deleting body
      } else if (body.for_deletion) {
        fetch(`${process.env.REACT_APP_BASE_URL}/bodies/${body.id}`, {
          method: 'DELETE'
        })
      }
    })
  }

  // sending request (called on Send button click)
  const handleSend = () => {
    props.updateResponseStatus('spin')
    props.updateResponseStatusText(null)

    fetch(finalUrl, {
      method: props.method,
      headers: finalHeaders,
      body: JSON.stringify(finalBody)
    })
    .then(resp => {
      console.log(resp)
      console.log('rs: ', resp.status, 'rst: ', resp.statusText)
      resp.status ? props.updateResponseStatus(resp.status) : props.updateResponseStatus(null)
      resp.statusText && props.updateResponseStatusText(resp.statusText)
      return resp.json()
    })
    .then(data => {
      console.log(data)
      props.updateResponse(data)
    })
    .catch((error) => {
      console.error('Error:', error)
      props.updateResponse(error)
    })
  }

  // preparing data for request
  const auth = props.attribs.find( ({attr_type, for_deletion}) => 
    attr_type === 'auth' && !for_deletion
  )

  const params = props.attribs.filter( attrib =>
    attrib.attr_type === 'params' && !attrib.for_deletion
  )
  
  const url = () => {
    if (params.length === 0 && (!auth || auth.description.toLowerCase() !== 'params')) {
      return props.url
    } else if (params.length > 0 && (!auth || auth.description.toLowerCase() !== 'params')) {
      let url = `${props.url}?`
      params.forEach(param => {
        url = url + param.key + '=' + param.value + '&'
      })
      url = url.slice(0, -1)
      return url
    } else if (params.length > 0 && auth && auth.description.toLowerCase() === 'params') {
      let url = `${props.url}?`
      params.forEach(param => {
        url = url + param.key + '=' + param.value + '&'
      })
      url = url + auth.key + '=' + auth.value
      return url
    } else if (params.length === 0 && auth && auth.description.toLowerCase() === 'params') {
      let url = `${props.url}?`
      url = url + auth.key + '=' + auth.value
      return url
    }
  }
  const finalUrl = url()

  const headers = () => {
    const xHeaders = props.attribs.filter( attrib =>
      attrib.attr_type === 'headers' && !attrib.for_deletion
    )
    const yHeaders = {}
    xHeaders.forEach(i => {
      yHeaders[i.key] = i.value
    })
    auth && auth.description.toLowerCase() === 'headers' ? yHeaders[auth.key] = auth.value : console.log(null) // <-- do not remove!
    return yHeaders
  }
  const finalHeaders = headers()

  const body = props.bodies.find( ({body_type, for_deletion}) => 
    body_type === 'Raw' && !for_deletion
  )
  const finalBody = body && dJSON.parse(body.raw_body)

  return (
    <Fragment>
      {/***  request title, collection, new request  ***/}
      <div className="pb-2 d-flex bd-highlight">
        <div className="flex-grow-1 bd-highlight">
          {!props.titleEdit ? 
            <h5 onClick={props.handleTitleEdit} className="pl-2 pt-1 pb-1 mb-0">
              <FontAwesomeIcon icon="pen" />  {props.requestTitle}
            </h5>
          :
            <div className="input-group">
              <div className="title-input">
                <input type="text" className="form-control url-input" id="requestTitle"
                       value={props.requestTitle} onChange={handleRequestTitle} />
              </div>
              <div className="input-group-append">
                <button onClick={props.handleTitleEdit} type="button" className="btn btn-primary">
                  <FontAwesomeIcon icon="check" />
                </button>
              </div>
            </div>
          }
        </div>
        {/**  selecting request collection  **/}
        <div className="bd-highlight">
          <h5 className="pt-1 pb-1 mb-0 d-none d-sm-block">Collection: </h5>
        </div>
        <div className="bd-highlight">
          <div className="form-group mb-0">
            <select onChange={handleCollection} value={JSON.stringify(props.collection)} className="custom-select url-input">
              {props.collections && props.collections.map(collection => 
                <option key={collection.id} value={JSON.stringify(collection)}>{collection.name}</option>
              )}
            </select>
           </div>
        </div>
        {/**  new request  **/}
        <div className="bd-highlight">
          <button type="button" className="btn btn-outline-primary btn-block" onClick={handleNewRequest}>
            <FontAwesomeIcon icon="plus" /> <span className="d-none d-sm-inline"> New Request </span>
          </button>
        </div>
      </div>

      {/***  request form  ***/}
      <div className="pb-2 d-flex bd-highlight">
        <div className="bd-highlight">
          <div className="btn-group btn-block" role="group">
            <button type="button" className="btn btn-primary btn-block dropdown-toggle" data-toggle="dropdown" aria-haspopup="true">{props.method}</button>
            <div className="dropdown-menu">
              <button onClick={handleMethod} className="dropdown-item" value="GET">GET</button>
              <button onClick={handleMethod} className="dropdown-item" value="POST">POST</button>
              <button onClick={handleMethod} className="dropdown-item" value="PUT">PUT</button>
              <button onClick={handleMethod} className="dropdown-item" value="PATCH">PATCH</button>
              <button onClick={handleMethod} className="dropdown-item" value="DELETE">DELETE</button>
            </div>
          </div>
        </div>
        <div className="flex-grow-1 bd-highlight">
          <div className="url-input">
            <input type="text" className="form-control" placeholder="url" id="url"
                   value={props.url} onChange={handleUrl} />
          </div>
        </div>
        <div className="bd-highlight">
          <button type="button" className="btn btn-outline-primary btn-block" onClick={handleSend}>
            <FontAwesomeIcon icon="bolt" /> <span className="d-none d-sm-inline"> Send </span>
          </button>
        </div>
        <div className="bd-highlight">
          <button type="button" className="btn btn-outline-primary btn-block" onClick={handleSave}>
            <FontAwesomeIcon icon="save" /> <span className="d-none d-sm-inline"> Save </span>
          </button>
        </div>
      </div>

      {/***  attributes tabs  ***/}
      <div className="btn-group btn-group-toggle pb-2" data-toggle="buttons">
        <label className="btn btn-outline-primary active">
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
    collections: state.collections,
    collection: state.collection,
    requests: state.requests,
    requestId: state.requestId,
    requestTitle: state.requestTitle,
    method: state.method,
    url: state.url,
    attribs: state.attribs,
    bodies: state.bodies,
    requestTab: state.requestTab,
    response: state.response
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setCollection: (data) => dispatch(setCollection(data)),
    updateRequests: (data) => dispatch(updateRequests(data)),
    setRequestId: (data) => dispatch(setRequestId(data)),
    setRequestTitle: (data) => dispatch(setRequestTitle(data)),
    selectMethod: (data) => dispatch(selectMethod(data)),
    setUrl: (data) => dispatch(setUrl(data)),
    updateAttribs: (data) => dispatch(updateAttribs(data)),
    updateBodies: (data) => dispatch(updateBodies(data)),
    switchRequestTab: (data) => dispatch(switchRequestTab(data)),
    updateResponse: (data) => dispatch(updateResponse(data)),
    updateResponseStatus: (data) => dispatch(updateResponseStatus(data)),
    updateResponseStatusText: (data) => dispatch(updateResponseStatusText(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Request)