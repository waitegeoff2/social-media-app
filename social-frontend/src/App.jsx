import { useEffect, useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar';
import LoginForm from './components/LoginForm/LoginForm';

function App() {
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)
  //only loads pages after details pulled from database
  const [appEnter, setAppEnter] = useState(false)
  //maybe put a blank version of the currentuser object so it doesn't struggle on initial render
  const [currentUser, setCurrentUser] = useState()
  const [userFriends, setUserFriends] = useState([])
  const [incomingRequests, setIncomingRequests] = useState([])
  const [error, setError] = useState()
  const apiUrl = import.meta.env.VITE_API_LINK;

  //get jwt token
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

  // Fetch details about current user when logged in
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
            setUserFriends(response.contacts)
            //PUT THIS HERE to avoid going forward without a db response
            // setAppEnter(true)
        })
        .catch((error) => setError(error))
  }, [authenticated]);

  //Fetch incoming friend requests
  useEffect(() => {
        const token = localStorage.getItem('jwtToken');

        fetch(`${apiUrl}/friends/sentrequests`, { 
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
            setIncomingRequests(response.receivedRequests)
        })
        .catch((error) => setError(error))
  }, [authenticated]);

  return (
    <>
    { loading ?
    <div></div>
    :
    <>
    { authenticated ?
      <>
        <NavBar authenticated={authenticated} setAuthenticated={setAuthenticated} setCurrentUser={setCurrentUser} incomingRequests={incomingRequests} setIncomingRequests={setIncomingRequests} userFriends={userFriends} setUserFriends={setUserFriends} setAppEnter={setAppEnter} />
        <Outlet context={{ authenticated, setAuthenticated, currentUser, setCurrentUser, userFriends }}  />
      </>
      :
      <>
        <LoginForm setAuthenticated={setAuthenticated} />
      </>
    }
    </>
    }
    </>
  )
}

export default App
