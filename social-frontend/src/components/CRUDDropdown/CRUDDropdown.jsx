import { useState, useEffect, useRef } from "react"
import "./CRUDDropDown.css"
import { useNavigate } from "react-router-dom";

export default function CRUDDropDown({ currentPost }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const apiUrl = import.meta.env.VITE_API_LINK;
  const navigate = useNavigate();

  function toggleDropdown() {
    console.log(currentPost)
    setIsOpen(!isOpen);
  }

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
    async function handleDelete(senderId, requestId) {
        // console.log(senderId)
        // //PUT THIS INTO THE REQ BODY BELOW AND UPDATE THE ROUTE TO USE IDS 
        // const token = localStorage.getItem('jwtToken');
        // console.log(token)
        // try {
        //     //if validation form returns true, continue with submission
        //     await fetch(`${apiUrl}/contact/addfriend`, { 
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${token}`
        //     },
        //     body: JSON.stringify({ senderId, requestId }), 
        //     })
        //     .then((response) => {
        //         return response.json();
        //     })
        //     .then((response) => { 
        //         console.log(response)
        //         //goes back to app and rerenders page
        //         navigate('/')
        //     })
        // } catch(error) {
        //     console.log(error)
        // }
    }

    return (
        <div className="dropdown" ref={dropdownRef}>
            <div className="dropdown-toggle" onClick={toggleDropdown}>
                &hellip;
            </div>
            {isOpen && (
                <ul className="dropdown-menu">
                    <li>EDIT POST</li>
                    <li>DELETE POST</li>
                </ul>
            )}
        </div>
    )
}