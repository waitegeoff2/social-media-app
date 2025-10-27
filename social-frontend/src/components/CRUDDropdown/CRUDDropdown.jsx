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
    async function handleDelete(postId) {
        const token = localStorage.getItem('jwtToken');

        try {
            await fetch(`${apiUrl}/posts/deletepost`, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ postId }), 
            })
            .then((response) => {
                return response.json();
            })
            .then((response) => { 
                console.log(response)
                navigate('/')
            })
        } catch(error) {
            console.log(error)
        }
    }

    return (
        <div className="dropdown" ref={dropdownRef}>
            <div className="dropdown-toggle" onClick={toggleDropdown}>
                &hellip;
            </div>
            {isOpen && (
                <ul className="dropdown-menu">
                    <button className="delete-btn" onClick={() => handleDelete(currentPost)}>Delete post.</button>
                </ul>
            )}
        </div>
    )
}