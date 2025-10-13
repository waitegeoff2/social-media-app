import { useState } from "react";
import { useNavigate } from "react-router";
import './SignUpForm.css'

export default function SignUpForm() {
    const [name, setName] = useState('');
    const [username, setUserName] = useState('');
    const [birthday, setBirthday] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    //get from backend
    const [errArray, setErrArray] = useState([]);
    const apiUrl = import.meta.env.VITE_API_LINK
    const navigate = useNavigate()

    console.log(apiUrl)

    async function handleSubmit(e) {
        e.preventDefault()

        //if validation form returns true, continue with submission
        fetch(`http://localhost:3000/access/newuser`, { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, username, password, confirmpassword: confirmPassword }), 
        })
        .then((response) => {
            return response.json();
        })
        .then((response) => { 
            console.log(response)
            if(response == true) {
                console.log('user created')
                navigate('/')
            } else {
                setErrArray(response.errors)
            }
            // navigate('/');
        })
        .catch((err) => {
            console.log(err);
        });
    }

    return (
        <div className="registration-section">
            <h2>Register:</h2>
            <ul className="errors-list">
            {errArray && errArray.map((error, index) =>(
                <li key={index}>{error.msg}</li>
            ))}
            </ul>
            <form className="registration-form form-outline" onSubmit={handleSubmit}>
                <label htmlFor="name">Full Name:</label>
                <input 
                    type="text"
                    id='name' 
                    name='name'
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
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
                {/* AGE */}
                <label htmlFor="name">Birthday:</label>
                <input 
                    type='date'
                    id='birthday' 
                    name='birthday'
                    placeholder="Your email (aaa@aaa.com)"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    required
                />
                <label htmlFor="password">Password:</label>
                <input 
                    type="password"
                    id='password' 
                    name='password'
                    placeholder="Passwords must match"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input 
                    type="password"
                    id='confirmpassword' 
                    name='confirmpassword'
                    placeholder="Passwords must match"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button className="submitBtn button-2000s" type="submit">Register</button>
            </form>
        </div>
    )
}