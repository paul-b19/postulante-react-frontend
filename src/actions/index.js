export function setUser(data) {
  return {
    type: 'SET_USER',
    payload: data
  }
}

export function updateCollections(collections) {
  return {
    type: 'UPDATE_COLLECTIONS',
    payload: collections
  }
}

export function setCollection(collection) {
  return {
    type: 'SET_COLLECTION',
    payload: collection
  }
}

export function updateRequests(requests) {
  return {
    type: 'UPDATE_REQUESTS',
    payload: requests
  }
}

export function updateSearch(input) {
  return {
    type: 'UPDATE_SEARCH',
    payload: input
  }
}

export function setRequestId(id) {
  return {
    type: 'SET_REQUEST_ID',
    payload: id
  }
}

export function setRequestTitle(title) {
  return {
    type: 'SET_REQUEST_TITLE',
    payload: title
  }
}

export function selectMethod(method) {
  return {
    type: 'SELECT_METHOD',
    payload: method
  }
}

export function setUrl(url) {
  return {
    type: 'SET_URL',
    payload: url
  }
}

export function updateAttribs(attribs) {
  return {
    type: 'UPDATE_ATTRIBS',
    payload: attribs
  }
}

export function updateBodies(bodies) {
  return {
    type: 'UPDATE_BODIES',
    payload: bodies
  }
}

export function switchRequestTab(tab) {
  return {
    type: 'SWITCH_REQUEST_TAB',
    payload: tab
  }
}

export function updateResponse(resp) {
  return {
    type: 'UPDATE_RESPONSE',
    payload: resp
  }
}

export function updateResponseStatus(respStat) {
  return {
    type: 'UPDATE_RESPONSE_STATUS',
    payload: respStat
  }
}

export function updateResponseStatusText(respStatText) {
  return {
    type: 'UPDATE_RESPONSE_STATUS_TEXT',
    payload: respStatText
  }
}