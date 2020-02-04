import React from 'react'
// import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import SideBar from './components/SideBar'
import Application from './containers/Application'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronRight, faChevronDown } from '@fortawesome/free-solid-svg-icons'

library.add( faChevronRight, faChevronDown )


function App() {
  return (
    <div className="d-flex" id="wrapper">
      <SideBar />
      <Application />
    </div>
  )
}

export default App
