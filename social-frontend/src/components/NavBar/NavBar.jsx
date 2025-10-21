import './NavBar.css'
import { Link } from 'react-router-dom'

export default function NavBar({ authenticated, setAuthenticated }) {

    async function handleLogOut() {
        localStorage.removeItem("jwtToken")
        setAuthenticated(false)
        console.log('Logged out. Token removed.')
    }

    return (
        <>
            <div className="nav-bar">
                <div className="nav-links">
                    <div className="left-links">
                        {/* FROG FACE IMAGE (old school facebook) */}
                        <Link className='home-link' to='/'> frogbook </Link>
                        <Link className='nav-link' to='/frogfriends'> Friends </Link>
                        <Link className='nav-link' to='/thepond'> The Pond </Link>
                        {/* DROPDOWN HERE, take from instant messenger app */}
                        <div>notif*</div>
                    </div>
                    <div className="main-title">
                       
                    </div>
                    <div className="right-links">
                        { authenticated && <button className='button-2000s logOutBtn' onClick={handleLogOut}>Log Out</button> }
                    </div>
                </div>
            </div>
        </>
    )
}