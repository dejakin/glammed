import React from 'react';
import { Link } from 'react-router-dom';

const ProfileEditButton = () => {
    return (
        <div className="buttons">
            <Link to="/edit-profile" className="btn1">
                <i className="fas fa-user-circle"></i> Edit Profile
            </Link>
        </div>
    )
}

export default ProfileEditButton;