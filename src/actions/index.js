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