import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { setCollection, updateRequests, setRequestId, setRequestTitle, 
         selectMethod, setUrl, switchRequestTab, updateAttribs, 
         updateBodies, updateResponse } from  '../actions'
import dJSON from 'dirty-json'

const Request = (props) => {

  const handleCollection = e => {
    console.log('set collection', JSON.parse(e.target.value))
    props.setCollection(JSON.parse(e.target.value))
  }

  // resetting Store state to default values
  const handleNewRequest = () => {
    console.log('New Request')
    props.setRequestId(null)
  }

  const handleRequestTitle = e => {
    console.log(e.target.value)
    props.setRequestTitle(e.target.value)
  }

  const handleUrl = e => {
    console.log(e.target.value)
    props.setUrl(e.target.value)
  }

  const handleMethod = e => {
    console.log(e.target.value)
    props.selectMethod(e.target.value)
  }

  // switching tabs Params/Auth/Headers/Body
  const handleTab = e => {
    console.log(e.target.value)
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
    console.log('creating request')
    fetch('http://localhost:3000/requests', {
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
        setTimeout(() => {             // <-- ????
          props.setRequestId(data.id)
        }, 500)
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
    console.log('updating request')
    fetch(`http://localhost:3000/requests/${reqId}`, {
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
        console.log(reqId)
        console.log(data.id)
        let updRequests = [...props.requests].map(req => {
          return req.id == reqId ? data : req}) // <-- integer vs string
        console.log('updRequests', updRequests)
        props.updateRequests(updRequests)

        setTimeout(() => {             // <-- ????
          props.setRequestId(reqId)
        }, 500)
        // props.setRequestId(reqId)   // <-- ????
      })
  }

  // updating request attribs (called from updateRequest() or createRequest())
  const updateReqAttribs = (reqId) => {
    props.attribs.forEach(attrib => {
      // updating attrib
      if (attrib.request_id && !attrib.for_deletion) {
        fetch(`http://localhost:3000/attribs/${attrib.id}`, {
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
        fetch('http://localhost:3000/attribs/', {
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
        fetch(`http://localhost:3000/attribs/${attrib.id}`, {
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
        fetch(`http://localhost:3000/bodies/${body.id}`, {
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
        fetch('http://localhost:3000/bodies/', {
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
        fetch(`http://localhost:3000/bodies/${body.id}`, {
          method: 'DELETE'
        })
      }
    })
  }

  // called on Send button click
  const handleSend = () => {
    console.log('body', body)
    console.log('finalBody', finalBody)

    fetch(finalUrl, {
      method: props.method,
      headers: finalHeaders,
      body: JSON.stringify(finalBody)
    })
    .then(resp => resp.json())
    .then(data => {
      console.log(data)
      props.updateResponse(data)
    })
    .catch((error) => {
      console.error('Error:', error)
      props.updateResponse(error)
    })
  }
  // const handleSend = () => {
  //   if (props.method === 'GET' || props.method === 'DELETE') {
  //     fetchGet()
  //   } else if (props.method === 'POST' || props.method === 'PUT' || props.method === 'PATCH') {
  //     fetchPost()
  //   }
  // }

  // preparing data for request
  const auth = props.attribs.find( ({attr_type, for_deletion}) => 
    attr_type === 'auth' && !for_deletion
  )

  const params = props.attribs.filter( attrib =>
    attrib.attr_type === 'params' && !attrib.for_deletion
  )
  
  const url = () => {
    if (params.length === 0) {
      return props.url
    } else {
      let url = `${props.url}?`
      params.forEach(param => {
        url = url + param.key + '=' + param.value + '&'
      })
      url = url.slice(0, -1)
      console.log('finalUrl: ', url)
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
    auth && auth.description === 'headers' ? yHeaders[auth.key] = auth.value : console.log(null) // <-- do not remove!
    console.log(yHeaders)
    return yHeaders
  }
  const finalHeaders = headers()

  const body = props.bodies.find( ({body_type, for_deletion}) => 
    body_type === 'Raw' && !for_deletion
  )
  const finalBody = body && dJSON.parse(body.raw_body)


  // // GET, DELETE requests (called from handleSend())
  // const fetchGet = () => {
  //   fetch(finalUrl, {
  //     method: props.method
  //   })
  //   .then(resp => resp.json())
  //   .then(data => {
  //     console.log(data)
  //     props.updateResponse(data)
  //   })
  // }

  // // POST, PUT, PATCH requests (called from handleSend())
  // const fetchPost = () => {
  //   console.log('body', body)
  //   console.log('finalBody', finalBody)

  //   fetch(finalUrl, {
  //     method: props.method,
  //     headers: finalHeaders,
  //     body: JSON.stringify(finalBody)
  //   })
  //   .then(resp => resp.json())
  //   .then(data => {
  //     console.log(data)
  //     props.updateResponse(data)
  //   })
  // }

  return (
    <Fragment>
      <ul className="nav nav-pills">
        <li className="nav-item">
          {!props.titleEdit ? 
            <h5 onClick={props.handleTitleEdit}>{props.requestTitle}</h5>
          :
            <div className="input-group mb-3">
              <div className="title-input">
                <input type="text" className="form-control" id="requestTitle"
                       value={props.requestTitle} onChange={handleRequestTitle} />
              </div>
              <div className="input-group-append">
                <span onClick={props.handleTitleEdit} className="input-group-text">Done</span>
              </div>
            </div>
          }
        </li>
        {/***  selecting request collection  ***/}
        <li className="nav-item">
          <div className="form-group">
            <select onChange={handleCollection} value={JSON.stringify(props.collection)} className="custom-select">
              {props.collections.map(collection => 
                <option key={collection.id} value={JSON.stringify(collection)}>{collection.name}</option>
              )}
            </select>
           </div>
        </li>
        {/***  new request  ***/}
        <li className="nav-item">
          <button type="button" className="btn btn-outline-primary"
                  onClick={handleNewRequest}>
            New Request</button>
        </li>
      </ul>
      {/***  request form  ***/}
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
          <button type="button" className="btn btn-outline-primary"
                  onClick={handleSend}>Send</button>
        </li>
        <li className="nav-item">
          <button type="button" className="btn btn-outline-primary"
                  onClick={handleSave}>Save</button>
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
    updateResponse: (data) => dispatch(updateResponse(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Request)