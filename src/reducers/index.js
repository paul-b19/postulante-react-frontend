let defaultState = {
  userId: 4, 
  collections: [],
  requests: [],
  searchValue: '',
  response: `function onLoad(editor) {
    console.log("i've loaded");
  }`
}

const globalReducer = (prevState = defaultState, action) => {
  switch(action.type) {
    case 'UPDATE_COLLECTIONS':
      // console.log(action.payload.collections)
      return {...prevState,
        collections: action.payload
      }
    case 'UPDATE_REQUESTS':
      return {...prevState,
        requests: action.payload
      }
    case 'UPDATE_SEARCH':
      return {...prevState,
        searchValue: action.payload
      }
    case 'UPDATE_RESPONSE':
      return {...prevState,
        response: action.payload
      }
 
    default:
      return prevState
  }
}

export default globalReducer