import './NavBar.css'
import { Link } from 'react-router-dom'
import Icon from '@mdi/react';
import { mdiAccountSupervisor } from '@mdi/js';
import ContactDropdown from '../../components/ContactDropdown/ContactDropdown'

export default function NavBar({ authenticated, setAuthenticated, setCurrentUser, incomingRequests, setIncomingRequests }) {

    async function handleLogOut() {
        localStorage.removeItem("jwtToken")
        setAuthenticated(false)
        setCurrentUser()
        console.log('Logged out. Token removed.')
    }

    const handleDropDownSelect = (selectedValue) => {
        console.log(selectedValue);
    };

    console.log(incomingRequests)

    return (
        <>
            <div className="nav-bar">
                <div className="nav-links">
                    <div className="left-links">
                        {/* FROG FACE IMAGE (old school facebook) */}
                        <Link className='home-link' to='/'> frogbook </Link>
                        <Link className='nav-link' to='/frogfriends'> Friends </Link>
                        <Link className='nav-link' to='/thepond'> The Pond </Link>
                        <ContactDropdown 
                        options={ incomingRequests }
                        onSelect={ handleDropDownSelect }
                        placeholder="Select"
                        setIncomingRequests={ setIncomingRequests }
                        />
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