let defaultState = {
  userId: 4, 
  collections: [],
  requests: []
}

export default function collectionReducer(
  prevState = defaultState,
  action
) {
  switch (action.type) {
    case 'UPDATE_COLLECTIONS':
      console.log(action.payload.collections)
      return {...prevState,
        collections: action.payload
      }
    case 'UPDATE_REQUESTS':
      return {...prevState,
        requests: action.payload
      }
 
    default:
      return prevState;
  }
}