import React from 'react';
import { Link } from 'react-router-dom';

const ProfileItem = ({ profile }) => {
    return (
        <div className="profile">
            <img src={profile.user.avatar} alt="" className="round-img" />
            <div>
                <h2>{profile.user.username}</h2>
                <p>{profile.location}</p>
                <Link to={`/profile/${profile.user.username}`} className="profile-button">
                    View Profile
                </Link>
            </div> 
            <ul>
                {profile.services.slice(0, 4).map((service, index) => (
                    <li key={index}>
                        <i className="fas fa-check"/> {service}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ProfileItem;