import { useState } from "react";
import { Link } from 'react-router-dom'
import './LoginForm.css'

export default function LoginForm({ setAuthenticated }) {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [errMessage, setErrMessage] = useState('');
    const apiUrl = import.meta.env.VITE_API_LINK;

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
                    // setTriggerJwt('new') ADD
                    console.log("token put into localStorage")
                }
                console.log(response)
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
    <div className="registration-section">
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
                <button className="submit-btn button-2000s" type="submit">Login</button>
            </form>
            <span>Not a member? <Link to ="/register">Register here.</Link></span>
            <span>LOGIN AS GUEST</span>
        </div>
    </div>
    )
}