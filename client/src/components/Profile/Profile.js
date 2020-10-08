import React, { useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileEditButton from './ProfileEditButton';
import { getCurrentProfile } from '../../actions/profile';

const Profile = ({ getCurrentProfile, auth: { user }, profile: { profile, loading } }) => {
    useEffect(() => {
        getCurrentProfile();
    }, []);

    /* If getCurrentProfile is yet to return, the spinner will show.
    Once returned, welcome message with username will show */
    return loading && profile === null ? <Spinner /> : <Fragment>
        <h1 className="large">PROFILE</h1>
        <p className="para2">
            <i className="fas fa-user"></i> Welcome <b>{ user && user.username }</b>!
        </p>
        { profile !== null ? (
            <Fragment>
                <ProfileEditButton />
                <div className="profile-header bg-primary p-2">
                    <img
                        className="round-img my-1"
                        src={user.avatar}
                        alt=""/>
                    <h1 className="username">{profile.username}</h1>
                    <p className="para4"><b>Bio</b>: {profile.bio}</p>
                    <p className="para4"><b>Location</b>: {profile.location}</p>
                    <p className="para4"><b>Services</b>:</p>
                    {profile.services.map(service => <p>{service}</p>)}
                    <p className="para4"><b>Social Links</b></p>
                    <div className="icons para4">
                        {profile.social.twitter && 
                        <a href={profile.social.twitter} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-twitter fa-2x"></i>
                        </a>}
                        {profile.social.facebook &&                 
                        <a href={profile.social.facebook} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-facebook fa-2x"></i>
                        </a>}
                        {profile.social.youtube && 
                        <a href={profile.social.youtube} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-youtube fa-2x"></i>
                        </a>}
                        {profile.social.instagram && 
                        <a href={profile.social.instagram} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-instagram fa-2x"></i>
                        </a>}
                    </div>
                </div>
            </Fragment>
        ) : (
            <Fragment>
                <p className="para3">You have created a profile yet. Please click the button below to get started.</p>
                <Link to='/create-profile' className='btn1'>
                    Create Profile
                </Link>
            </Fragment>
        ) }
    </Fragment>;
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, { getCurrentProfile })(Profile);
