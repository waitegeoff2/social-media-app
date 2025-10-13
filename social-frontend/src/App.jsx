import { useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar';
import LoginForm from './components/LoginForm/LoginForm';


function App() {
  //add the login page here on the top level???
  const [authenticated, setAuthenticated] = useState(false)

  return (
    <>
    {authenticated ?
    <>
      <NavBar authenticated={authenticated} setAuthenticated={setAuthenticated} />
      <Outlet context={{ authenticated, setAuthenticated }}  />
    </>
    :
    <>
      <NavBar authenticated={authenticated} setAuthenticated={setAuthenticated} />
      <LoginForm />
    </>
  }
    </>
  )
}

export default App
