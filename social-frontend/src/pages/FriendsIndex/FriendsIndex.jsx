// this page displays your friends and also a list of users that you can add
import { useEffect, useState } from "react";
import { Link, Outlet, useOutletContext } from "react-router-dom";
import ContactRequestModal from "../../components/ContactRequestModal/ContactRequestModal";
import './FriendsIndex.css'
import frogimage from '../../assets/frogimg.jpg'

export default function FriendsIndex() {
    const apiUrl = import.meta.env.VITE_API_LINK;
    const [suggestedUsers, setSuggestedUsers] = useState([])
    const [error, setError] = useState('')
    const { currentUser, userFriends } = useOutletContext()
    //modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [contactEmail, setContactEmail] = useState('');

    function openModal() {
        setIsModalOpen(true)
    }

    const closeModal = () => setIsModalOpen(false);

    //handle sending someone a contact request
    async function handleRequest(e){
        closeModal()
        const token = localStorage.getItem('jwtToken');
        e.preventDefault();
        try {
            await fetch(`${apiUrl}/friends/requestfriend`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ contactEmail }),
            })
            .then((response) => {
                return response.json();
            })
            .then((response) => {   
                console.log(response)
            })
        } catch(error) {
            console.log(error)
        }
    }

    async function handleBtnRequest(userId) {
        const token = localStorage.getItem('jwtToken');

        try {
            await fetch(`${apiUrl}/friends/requestfriendbyid`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ userId }),
            })
            .then((response) => {
                return response.json();
            })
            .then((response) => {   
                console.log(response)
            })
        } catch(error) {
            console.log(error)
        }
    }

    //get a list of users to suggest as potential friends
    useEffect(() => {
        const token = localStorage.getItem('jwtToken');

        fetch(`${apiUrl}/friends/suggestedfrogs`, { 
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }, 
        })
        .then((response) => {
            return response.json();
        })
        .then((response) => { 
            console.log(response)
            setSuggestedUsers(response)
        })
        .catch((error) => setError(error))
    }, []);

    return (
        <>
        <div className="friends-index">
            <div className="friends-list-section">
                <div className="friends-list-header"><h2>Your friends</h2></div>
                <button className="add-btn button-2000s" onClick={openModal}>+ Add New Contact</button>
                <div className="friends-list">
                    {userFriends && 
                    userFriends.length > 0 ?
                        <>
                        {userFriends.map((contact, index) => (
                            <div key={contact.id} className="user-box">
                                <img className="display-picture" src={ contact.profilepic === null ? frogimage : contact.profilepic} alt="The chat recipient's profile picture" />                                
                                <Link className='profile-link' to={`/profile/${contact.id}`}> <div>{contact.name}</div> </Link>
                            </div>
                        ))}
                        </>
                        :
                        <div>No friends yet. Add some.</div>
                    }
                </div>
            </div>
            <div className="suggested-friends-sidebar">
                <div className="suggested-friends-list-header"><h2>Frogs you may know</h2></div>
                <div className="suggested-friends-list">
                    {suggestedUsers.map((user, index) => (
                        <div className="suggested-list-item" key={user.id}>
                            {(user.id!==currentUser.id)  && (
                                <div key={user.id} className="user-info-box">
                                    <img className="display-picture" src={ user.profilepic === null ? frogimage : user.profilepic} alt="The chat recipient's profile picture" />                                
                                    <Link className='profile-link' to={`/profile/${user.id}`}> {user.name} </Link>
                                    {(userFriends &&
                                      currentUser &&
                                      (user.id!==currentUser.id) &&
                                      userFriends.some(friend => friend.id === user.id)) ?
                                        <div><b>Your friend.</b></div>
                                        :
                                        <button className="add-friend-btn" onClick={() => handleBtnRequest(user.id)}>Add friend</button>
                                    }
                                </div>
                            )}                            
                        </div>                       
                    ))}
                </div>
            </div>
        </div>
        <ContactRequestModal isOpen={isModalOpen} onClose={closeModal}>
            <div className="contact-request-section">
                <h2>Add a New Contact</h2>
                <form className="request-form" onSubmit={handleRequest}>
                    <div className="high-score-input">
                        <label htmlFor="name">Contact email:</label>
                        <input 
                            type="text"
                            id='contactEmail' 
                            name='contactEmail'
                            placeholder="aaa@aaa.com"
                            value={contactEmail}
                            onChange={(e) => setContactEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button className="add-btn button-2000s" type="submit">Send request</button>
                </form>
            </div>
        </ContactRequestModal>
        </>
    )
}