import React from 'react';

const Header = ({ profile: {
    user,
    username,
    location,
    bio,
    social
} }) => {
    return (
        <div class="profile-top bg-primary p-2">
            <img
                class="round-img my-1"
                src={user.avatar}
                alt=""/>
            <h1 class="large">{username}</h1>
            <p class="lead">{bio}</p>
            <p>{location}</p>
            <div class="icons my-1">
                {social.twitter && 
                <a href={social.twitter} target="_blank" rel="noopener noreferrer">
                <i class="fab fa-twitter fa-2x"></i>
                </a>}
                {social.facebook &&                 
                <a href={social.facebook} target="_blank" rel="noopener noreferrer">
                <i class="fab fa-facebook fa-2x"></i>
                </a>}
                {social.youtube && 
                <a href={social.youtube} target="_blank" rel="noopener noreferrer">
                <i class="fab fa-youtube fa-2x"></i>
                </a>}
                {social.instagram && 
                <a href={social.instagram} target="_blank" rel="noopener noreferrer">
                <i class="fab fa-instagram fa-2x"></i>
                </a>}
            </div>
        </div>
    )
}

export default Header;
