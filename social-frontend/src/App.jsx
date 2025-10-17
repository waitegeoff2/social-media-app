import { useEffect, useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar';
import LoginForm from './components/LoginForm/LoginForm';


function App() {
  //add the login page here on the top level???
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
      const token = localStorage.getItem('jwtToken'); // Or wherever your token is stored

      if (token) {
        setAuthenticated(true);
        setLoading(false)
      } else {
        setAuthenticated(false);
        setLoading(false)
      }
  }, []);

  //GET FRIEND REQUESTS SENT TO USER
  

  return (
    <>
    { loading ?
    <div></div>
    :
    <>
    { authenticated ?
      <>
        <NavBar authenticated={authenticated} setAuthenticated={setAuthenticated} />
        <Outlet context={{ authenticated, setAuthenticated }}  />
      </>
      :
      <>
        <NavBar authenticated={authenticated} setAuthenticated={setAuthenticated} />
        <LoginForm setAuthenticated={setAuthenticated} />
      </>
    }
    </>
    }
    </>
  )
}

export default App
