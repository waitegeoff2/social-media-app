import { useState, useEffect, useRef } from "react"
import "./ContactDropdown.css"
import { useNavigate } from "react-router-dom";
import Icon from '@mdi/react';

import { mdiAccountSupervisor } from '@mdi/js';
import ContactDropdown from '../../components/ContactDropdown/ContactDropdown'

export default function DropDown({ options, onSelect, placeholder, incomingRequests, setIncomingRequests, userFriends, setUserFriends }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const apiUrl = import.meta.env.VITE_API_LINK;
  const navigate = useNavigate();

  const toggleDropdown = () => setIsOpen(!isOpen);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
        return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    //when you accept or deny a friend request
    async function addContact(senderId, requestId, index) {
        console.log(senderId)
        //PUT THIS INTO THE REQ BODY BELOW AND UPDATE THE ROUTE TO USE IDS 
        const token = localStorage.getItem('jwtToken');
        console.log(token)
        try {
            //if validation form returns true, continue with submission
            await fetch(`${apiUrl}/friends/addfriend`, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ senderId, requestId }), 
            })
            .then((response) => {
                return response.json();
            })
            .then((response) => { 
                console.log(response)
                const reqArray = [...incomingRequests]
                reqArray.splice(index, 1) 
                setIncomingRequests(reqArray)
                setUserFriends(response.contacts)
            })
        } catch(error) {
            console.log(error)
        }
    }

    return (
        <div className="dropdown" ref={dropdownRef}>
            <button className="dropdown-toggle" onClick={toggleDropdown}>
                <Icon path={mdiAccountSupervisor} size={1} />
                { options && options.length > 0 && <div className="notifications">{options.length}</div> }
            </button>
            {isOpen && (
                <ul className="dropdown-menu">
                    {(options.length > 0) ? 
                    options.map((request, index) => (
                        <li className="request-item" key={request.id}>
                            <div className="sidebar-name"><b>Contact request from:</b> {request.requestfrom.name}</div>
                            <button className="button-2000s" onClick={() => addContact(request.requestfrom.id, request.id, index)}>Accept</button>
                            {/* ONCLICK: Delete request ADD THIS LATER */}
                            <button className="button-2000s">Deny</button>
                        </li>
                    ))
                    :
                    <div className="request-item">No friend requests right now.</div>
                    }
                </ul>
            )}
        </div>
    )
}