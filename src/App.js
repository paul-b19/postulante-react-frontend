import React from 'react'
import { connect } from 'react-redux'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import LogIn from './containers/Login'
import SignUp from './containers/Signup'
import Docs from './containers/Docs'
import Application from './containers/Application'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronRight, faChevronDown, faPlus, faCheck, faTimes, 
         faCode, faQuestionCircle, faExchangeAlt, faSignOutAlt, faSignInAlt, 
         faQuoteLeft, faQuoteRight, faCog, faBolt, faSave, 
         faSyncAlt, faDatabase, faGem, faTable, faHandSpock, 
         faPen, faTrashAlt, faUser } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add( faChevronRight, faChevronDown, faPlus, faCheck, faTimes, 
             faCode, faQuestionCircle, faExchangeAlt, faSignOutAlt, faSignInAlt, 
             faQuoteLeft, faQuoteRight, faCog, faBolt, faSave, faSyncAlt, 
             faDatabase, faGem, faTable, faHandSpock, faPen, faUser, faTrashAlt, fab )


function App (props) {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={LogIn} />
        <Route path='/signup' component={SignUp} />
        <Route path="/account" render={() => props.userId ? 
          <Application />
          :
          <Redirect to="/" />}/>
        <Route path='/docs' component={Docs} />
        <Route render={() => <h1 className="text-center pt-5">There's no such route...</h1>} />
      </Switch>
    </Router>
  )
}

const mapStateToProps = state => {
  return {
    userId: state.userId
  }
}

export default connect(
  mapStateToProps
)(App)
