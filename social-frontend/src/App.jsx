import { useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar';


function App() {
  //add the login page here on the top level???
  const [authenticated, setAuthenticated] = useState(false)

  return (
    <>
    {/* Login here??? top level to keep everyone out unless authenticated */}
      <NavBar authenticated={authenticated} setAuthenticated={setAuthenticated} />
      <Outlet context={{ authenticated, setAuthenticated }}  />
    </>
  )
}

export default App
