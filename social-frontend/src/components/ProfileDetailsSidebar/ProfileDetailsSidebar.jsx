//sidebar for your profile to show pic/personal details, and a link to edit
import frogimage from '../../assets/frogimg.jpg'
import './ProfileDetailsSidebar.css'
import { Link } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';

export default function ProfileDetailsSidebar({ userWall }) {
    const apiUrl = import.meta.env.VITE_API_LINK;

    const {currentUser} = useOutletContext()


    return (
        <>
        {userWall && 
        <div className="profile-sidebar">
            <div className="profile-pic">
                <img className="profile-picture" src={ userWall.profilepic === null ? frogimage : userWall.profilepic} alt="The chat recipient's profile picture" />
            </div>
            <div className="user-name"><h2>{userWall.name}</h2></div>
            <div className="information-section">
                <h4 className='info-header'>Information:</h4>
                <div className="info-list">
                    <div className="info-list-item">
                        <div className="info-list-heading"><b>Birthday: </b></div>
                        <div className="info-list-info">{userWall.birthday.split('T')[0]}</div>
                    </div>
                    {userWall.bio !== null &&
                    <div className="info-list-item">
                        <div className="info-list-heading"><b>Bio: </b></div>
                        <div className="info-list-info">{userWall.bio}</div>
                    </div>
                    }
                    
                </div>
                { userWall.id == currentUser.id &&
                <Link className='edit-link' to='/editprofile'>Edit Profile</Link>
                }
            </div>
        </div>
        }
        </>
    )
}