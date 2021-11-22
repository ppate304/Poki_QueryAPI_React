import React, { Component } from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './views/Home'
import Login from './views/Login.js'
import NavBar from './components/NavBar'
import 'bootstrap/dist/css/bootstrap.min.css';

export default class App extends Component {



render() {
  return (
    <div>
     <NavBar/>
      <Routes>
        <Route path = '/' element = { <Home/>}/>
        <Route path = '/login' element= {<Login/>}/>
      </Routes>
    </div>
  )
}
}
