// import 'bootstrap/dist/css/bootstrap.min.css';
import './css/bootstrap.min.css'
import './css/custom.css'
// import $ from 'jquery'
// import Popper from 'popper.js'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import React from 'react'
import ReactDOM from 'react-dom'

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import collectionsReducer from './reducers/collectionsReducer'

import App from './App'
import * as serviceWorker from './serviceWorker'

const store = createStore(
  collectionsReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
