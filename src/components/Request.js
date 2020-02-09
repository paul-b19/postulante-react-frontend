import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { setCollection, updateRequests, setRequestId, setRequestTitle, 
         selectMethod, setUrl, switchRequestTab, updateAttribs, updateBodies } from  '../actions'

const Request = (props) => {

  const handleCollection = e => {
    console.log('set collection', JSON.parse(e.target.value))
    props.setCollection(JSON.parse(e.target.value))
  }

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

  const handleTab = e => {
    console.log(e.target.value)
    props.switchRequestTab(e.target.value)
  }

  // creating new request or updating existing one
  const handleSave = () => {
    props.requestId ?
      updateRequest(props.requestId)
    :
      createRequest()
  }

  // creating new request
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
        updateRequest(data.id)
        // props.setRequestId(data.id)
        // props.updateRequests([...props.requests, data])
      })
  }
  // const createRequest = () => {
  //   console.log('creating request')
  //   fetch('http://localhost:3000/requests', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       "title": props.requestTitle,
  //       "method": props.method,
  //       "url": props.url,
  //       "collection_id": props.collection.id
  //     })
  //   })
  //     .then(resp => resp.json())
  //     .then(data => {
  //       props.setRequestId(data.id)
  //       props.updateRequests([...props.requests, data])
  //     })
  // }
  
  // updating existing request
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
      })
  }
  // const updateRequest = (id) => {
  //   console.log('updating request')
  //   fetch(`http://localhost:3000/requests/${props.requestId}`, {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       "title": props.requestTitle,
  //       "method": props.method,
  //       "url": props.url,
  //       "collection_id": props.collection.id
  //     })
  //   })
  //     .then(resp => resp.json())
  //     .then(data => {
  //       console.log(props.requestId)
  //       console.log(data.id)
  //       let updRequests = [...props.requests].map(req => {
  //         return req.id == props.requestId ? data : req}) // <-- integer vs string
  //       console.log('updRequests', updRequests)
  //       props.updateRequests(updRequests)
  //     })
  // }

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
          <button type="button" className="btn btn-outline-primary">Send</button>
        </li>
        <li className="nav-item">
          <button type="button" className="btn btn-outline-primary"
                  onClick={handleSave}>
            Save
          </button>
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
    requestTab: state.requestTab
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
    switchRequestTab: (data) => dispatch(switchRequestTab(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Request)