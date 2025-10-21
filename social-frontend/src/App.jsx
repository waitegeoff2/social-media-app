import { useEffect, useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar';
import LoginForm from './components/LoginForm/LoginForm';


function App() {
  //add the login page here on the top level???
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState()
  const apiUrl = import.meta.env.VITE_API_LINK;

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

  //Fetch details about current user to be used throughout app
  useEffect(() => {
        const token = localStorage.getItem('jwtToken');

        fetch(`${apiUrl}/access/user`, { 
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },     
        })
        .then((response) => {
        if (response.status >= 400) {
            throw new Error("server error");
        }
        return response.json();
        })
        .then((response) => {
            setCurrentUser(response)
        })
        .catch((error) => setError(error))
  }, []);

  //GET FRIEND REQUESTS PUT ON NAVBAR
  

  return (
    <>
    { loading ?
    <div></div>
    :
    <>
    { authenticated ?
      <>
        <NavBar authenticated={authenticated} setAuthenticated={setAuthenticated} />
        <Outlet context={{ authenticated, setAuthenticated, currentUser }}  />
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
