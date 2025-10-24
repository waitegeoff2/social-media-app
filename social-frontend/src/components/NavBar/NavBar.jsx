import './NavBar.css'
import { Link } from 'react-router-dom'
import Icon from '@mdi/react';
import { mdiAccountSupervisor } from '@mdi/js';
import ContactDropdown from '../../components/ContactDropdown/ContactDropdown'
import frogImg from '../../assets/frog3.jpg'

export default function NavBar({ authenticated, setAuthenticated, setCurrentUser, incomingRequests, setIncomingRequests, userFriends, setUserFriends }) {

    async function handleLogOut() {
        localStorage.removeItem("jwtToken")
        setAuthenticated(false)
        setCurrentUser()
        console.log('Logged out. Token removed.')
    }

    const handleDropDownSelect = (selectedValue) => {
        console.log(selectedValue);
    };

    return (
        <>
            <div className="nav-bar">
                <div className="nav-links">
                    <div className="left-links">
                        <Link className='frog-link' to='/'><img className='frog-header-img' src={frogImg} alt="Image of a frog." /></Link>
                        <Link className='home-link' to='/'> frogbook </Link>
                        <Link className='nav-link' to='/frogfriends'> Frogs (Friends) </Link>
                        <Link className='nav-link' to='/thepond'> The Pond </Link>
                        <ContactDropdown 
                        options={ incomingRequests }
                        onSelect={ handleDropDownSelect }
                        placeholder="Select"
                        incomingRequests={incomingRequests}
                        setIncomingRequests={ setIncomingRequests }
                        userFriends={userFriends}
                        setUserFriends={setUserFriends}
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