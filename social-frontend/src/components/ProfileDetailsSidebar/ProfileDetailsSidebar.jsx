//sidebar for your profile to show pic/personal details, and a link to edit
import frogimage from '../../assets/frogimg.jpg'
import './ProfileDetailsSidebar.css'

export default function ProfileDetailsSidebar({ currentUser }) {
    const apiUrl = import.meta.env.VITE_API_LINK;

    console.log(currentUser)
    return (
        <>
        {currentUser && 
        <div className="profile-sidebar">
            <div className="profile-pic">
                <img className="profile-picture" src={ currentUser.profilepic === null ? frogimage : `${apiUrl}${currentUser.profilepic}`} alt="The chat recipient's profile picture" />
            </div>
            <div className="user-name"><h2>{currentUser.name}</h2></div>
            <div className="information-section">
                <h4 className='info-header'>Information:</h4>
                <div className="info-list">
                    <div className="info-list-item">
                        <div className="info-list-heading"><b>Birthday: </b></div>
                        <div className="info-list-info">{currentUser.birthday.split('T')[0]}</div>
                    </div>
                    {currentUser.bio !== null &&
                    <div className="info-list-item">
                        <div className="info-list-heading"><b>Bio: </b></div>
                        <div className="info-list-info">{currentUser.bio}</div>
                    </div>
                    }
                </div>

            </div>
        </div>
        }
        </>
    )
}