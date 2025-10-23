import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './EditProfileDetails.css'
import { useOutletContext } from "react-router-dom";

export default function EditProfileDetails() {
    const [bio, setBio] = useState('')
    const [uploadMessage, setUploadMessage] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const { currentUser, setCurrentUser } = useOutletContext()
    const apiUrl = import.meta.env.VITE_API_LINK;
    const navigate = useNavigate();

    const handleFileChange = (event) => {
            setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
            const token = localStorage.getItem('jwtToken');

            if (!selectedFile) {
                setUploadMessage('Please select a file first!');
                return;
            }

            const formData = new FormData();
            formData.append('file', selectedFile);
            console.log(formData)

            try {
                fetch(`${apiUrl}/upload`, { 
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData, 
                })
                .then((response) => {
                    return response.json();
                })
                .then((response) => { 
                    console.log(response)
                    const updatedUser = {
                        ...currentUser,
                        profilepic: response.url,
                    }
                    setCurrentUser(updatedUser)
                    navigate('/');
                })
                .catch((err) => {
                    console.log(err);
                });
            } catch (error) {
                console.error('Frontend upload error:', error);
                setUploadMessage('Error uploading file.');
            }
    };
    
    async function handleSubmit(e) {
        e.preventDefault()
        const token = localStorage.getItem('jwtToken');

        //if validation form returns true, continue with submission
        fetch(`${apiUrl}/profile/update`, { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ bio }), 
        })
        .then((response) => {
            return response.json();
        })
        .then((response) => { 
            console.log(response)
            const updatedUser = {
                ...currentUser,
                bio: bio,
            }
            setCurrentUser(updatedUser)
            console.log('handle submit running')
            navigate('/')
        })
        .catch((err) => {
            console.log(err);
        });
    }

    console.log(currentUser)
    
    return (
    <>
        {/* <h1>Your Profile</h1>
        <h2>{}</h2> */}
        <div className="profile-section">
            <h1>Update your profile</h1>
            <form className="registration-form" onSubmit={handleSubmit}>
                    <label htmlFor="name">Bio:</label>
                    <input 
                        type="text"
                        id='bio' 
                        name='bio'
                        placeholder="Enter a short bio."
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                    />
                    <label htmlFor="pic">Upload profile pic:</label>
                    <input id='file' name='file' type="file" onChange={handleFileChange} />
                    <button className="button-2000s" onClick={handleUpload} type='submit'>Update details</button>
                    {uploadMessage && <p>{uploadMessage}</p>}
            </form>
        </div>
    </>
    )
}