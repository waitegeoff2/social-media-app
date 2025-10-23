import { useEffect, useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar';
import LoginForm from './components/LoginForm/LoginForm';
import { useNavigate } from 'react-router-dom';


function App() {
  //add the login page here on the top level???
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)
  //maybe put a blank version of the currentuser object so it doesn't struggle on initial render
  const [currentUser, setCurrentUser] = useState()
  const [userFriends, setUserFriends] = useState([])
  const [incomingRequests, setIncomingRequests] = useState([])
  const [error, setError] = useState()
  const apiUrl = import.meta.env.VITE_API_LINK;
  const navigate = useNavigate()

  //for a GUEST PROFILE
  const [isGuest, setIsGuest] = useState(false)
   //if TRUE, make current user equal an identical object to current user but 
    //with something you define, make a fake current user

  //if there's a jwt token, grab it when page loads
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
  //run when user logs in
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

            //if guest =true, set current user to guest???
        })
        .catch((error) => setError(error))
  }, [authenticated]);

  //GET FRIEND REQUESTS PUT ON NAVBAR
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
        <NavBar authenticated={authenticated} setAuthenticated={setAuthenticated} setCurrentUser={setCurrentUser} incomingRequests={incomingRequests} setIncomingRequests={setIncomingRequests} />
        <Outlet context={{ authenticated, setAuthenticated, currentUser, setCurrentUser, userFriends }}  />
      </>
      :
      <>
        {/* <NavBar authenticated={authenticated} setAuthenticated={setAuthenticated} /> */}
        <LoginForm setAuthenticated={setAuthenticated} />
      </>
    }
    </>
    }
    </>
  )
}

export default App
