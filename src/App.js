import React from 'react'
// import './App.css'
// import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import SideBar from './components/SideBar'
import Application from './containers/Application'

function App() {
  return (
    <div className="d-flex" id="wrapper">
      <SideBar />
      <Application />
    </div>
  )
}

export default App
