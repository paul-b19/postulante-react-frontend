let defaultState = {
  component: 'login',  // 'signup', 'account', 'docs'
  userId: null,   // <-- 10
  collections: [],
  collection: '',  // <-- collection object
  requests: [],
  searchValue: '',
  requestId: null,
  requestTitle: 'Untitled',
  method: 'GET',
  url: '',
  attribs: [],
  bodies: [],
  requestTab: 'params',
  response: 'Response will be rendered here',
  responseStatus: null,
  responseStatusText: null
}

const globalReducer = (prevState = defaultState, action) => {
  switch(action.type) {
    case 'SET_COMPONENT':
      return {...prevState,
        component: action.payload
      }
    case 'SET_USER_ID':
      return {...prevState,
        userId: action.payload
      }
    case 'UPDATE_COLLECTIONS':
      return {...prevState,
        collections: action.payload
      }
    case 'SET_COLLECTION':
      return {...prevState,
        collection: action.payload
      }
    case 'UPDATE_REQUESTS':
      return {...prevState,
        requests: action.payload
      }
    case 'UPDATE_SEARCH':
      return {...prevState,
        searchValue: action.payload
      }
    case 'SET_REQUEST_ID':
      return {...prevState,
        requestId: action.payload
      }
    case 'SET_REQUEST_TITLE':
      return {...prevState,
        requestTitle: action.payload
      }
    case 'SELECT_METHOD':
      return {...prevState,
        method: action.payload
      }
    case 'SET_URL':
      return {...prevState,
        url: action.payload
      }
    case 'UPDATE_ATTRIBS':
      return {...prevState,
        attribs: action.payload
      }
    case 'UPDATE_BODIES':
      return {...prevState,
        bodies: action.payload
      }
    case 'SWITCH_REQUEST_TAB':
      return {...prevState,
        requestTab: action.payload
      }
    case 'UPDATE_RESPONSE':
      return {...prevState,
        response: action.payload
      }
    case 'UPDATE_RESPONSE_STATUS':
      return {...prevState,
        responseStatus: action.payload
      }
    case 'UPDATE_RESPONSE_STATUS_TEXT':
      return {...prevState,
        responseStatusText: action.payload
      }

    default:
      return prevState
  }
}

export default globalReducer