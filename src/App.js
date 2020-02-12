import React from 'react'
// import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import SideBar from './components/SideBar'
import Application from './containers/Application'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronRight, faChevronDown, faPlus, faCheck, faTimes, 
         faCode, faQuestionCircle, faExchangeAlt, faSignOutAlt, 
         faQuoteLeft, faQuoteRight, faCogs, faBolt, faSave, faSyncAlt } from '@fortawesome/free-solid-svg-icons'

library.add( faChevronRight, faChevronDown, faPlus, faCheck, faTimes, 
             faCode, faQuestionCircle, faExchangeAlt, faSignOutAlt, 
             faQuoteLeft, faQuoteRight, faCogs, faBolt, faSave, faSyncAlt )


function App() {
  return (
    <div className="d-flex" id="wrapper">
      <SideBar />
      <Application />
    </div>
  )
}

export default App
