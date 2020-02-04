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