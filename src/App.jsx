import { useState } from 'react'
import { BrowserRouter , Routes, Route, Link} from 'react-router-dom';
import './App.css'
import Landing from './components/landing.jsx';
import OK from './components/info.jsx'
import Profile from './components/profile.jsx'
import CreateAccount from './components/cAccount.jsx'

function App() {
  

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path = "/" element = { <Landing/>}></Route>
      <Route path = "/info" element = { <OK/>}></Route>
      <Route path = "/profile" element = { <Profile/>}></Route>
      {/* <Route path = "/Create-Account" element = { <CreateAccount/>}></Route> */}
    </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
