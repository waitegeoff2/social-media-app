import { useState } from "react";
import { Link } from 'react-router-dom'
import './LoginForm.css'
import { useNavigate } from "react-router-dom";

export default function LoginForm({ setAuthenticated }) {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [errMessage, setErrMessage] = useState('');
    const apiUrl = import.meta.env.VITE_API_LINK;
    const navigate = useNavigate()

   async function handleSubmit(e) {
        e.preventDefault()
        //if validation form returns true, continue with submission
            fetch(`${apiUrl}/access/login`, { 
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }), 
            })
            .then((response) => {
                return response.json();
            })
            .then((response) => { 
                console.log(response)
                if(response.message=='Unauthorized') {
                    setErrMessage('Invalid credentials')
                } else {
                    setErrMessage('')
                    let data = response.token
                    localStorage.setItem('jwtToken', data)
                    setAuthenticated(true)
                    //takes to home page (top level of app)
                    navigate('/')
                    console.log("token put into localStorage")
                }
                console.log(response)
            })
            .catch((err) => {
                console.log(err);
            });
    }

    async function handleGuest() {
        //set password and username to Guest credentials
        setUserName('guestaccount@tester.com')
        setPassword('GuestPasswordTime53')
    }

    return (
    <div className="registration-section">
        <h1>frogbook</h1>
        <div className="form-outline">
            <h2>Login:</h2>
            {errMessage && <span>{errMessage}</span>}
            <form className="registration-form" onSubmit={handleSubmit}>
                <div className="form-section">
                    <label htmlFor="name">Username:</label>
                    <input
                        type="email"
                        id='username'
                        name='username'
                        placeholder="Your email (aaa@aaa.com)"
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-section">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id='password'
                        name='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button className="submit-btn button-2000s" type="submit">LOGIN</button>
            </form>
            <span><b>Not a member? </b><Link className="register-page-link" to ="/register">Register here.</Link></span>
            <div className="guest-block">
                <button onClick={handleGuest}>LOGIN AS GUEST</button>
                <span><b>Click to check out frogbook as a guest.</b></span>
            </div>
        </div>
    </div>
    )
}