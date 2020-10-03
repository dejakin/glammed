import React from 'react';

const Header = ({ profile: {
    user,
    username,
    location,
    bio,
    social,
    services
} }) => {
    return (
        <div className="profile-header bg-primary p-2">
            <img
                className="round-img my-1"
                src={user.avatar}
                alt=""/>
            <h1>{username}</h1>
            <p className="para4"><b>Bio</b>: {bio}</p>
            <p className="para4"><b>Location</b>: {location}</p>
            <p className="para4"><b>Services</b>:</p>
            {services.map(service => <p>{service}</p>)}
            <p className="para4"><b>Social Links</b></p>
            <div className="icons para4">
                {social.twitter && 
                <a href={social.twitter} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter fa-2x"></i>
                </a>}
                {social.facebook &&                 
                <a href={social.facebook} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook fa-2x"></i>
                </a>}
                {social.youtube && 
                <a href={social.youtube} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-youtube fa-2x"></i>
                </a>}
                {social.instagram && 
                <a href={social.instagram} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram fa-2x"></i>
                </a>}
            </div>
        </div>
    )
}

export default Header;
