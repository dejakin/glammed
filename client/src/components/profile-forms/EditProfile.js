import React, { Fragment, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile, deleteAccount } from '../../actions/profile';

const EditProfile = ({ 
    profile: { profile, loading }, 
    createProfile, 
    getCurrentProfile,
    deleteAccount, 
    history 
}) => {
const [formData, setFormData] = useState({
    bio: '',
    location: '',
    services: '',
    email: '',
    youtube: '',
    twitter: '',
    instagram: '',
    facebook: '',
});

// Load user's current profile once component renders
useEffect(() => {
    getCurrentProfile();

/* formData needs to be in sync with user's current profile upon render 
so that the user doesn't have to fill unedited fields out again */
setFormData({
    bio: loading || !profile.bio ? '' : profile.bio, 
    location: loading || !profile.location ? '' : profile.location,
    services: loading || !profile.services ? '' : profile.services.join(', '),
    email: loading || !profile.email ? '' : profile.email, 
    youtube: loading || !profile.social.youtube ? '' : profile.social.youtube,
    twitter: loading || !profile.social.twitter ? '' : profile.social.twitter,
    instagram: loading || !profile.social.instagram ? '' : profile.social.instagram,
    facebook: loading || !profile.social.facebook ? '' : profile.social.facebook 
  });
}, [loading]);

const {
    bio,
    location,
    services,
    email,
    youtube,
    twitter,
    instagram,
    facebook,
} = formData

const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});
const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history, true)
};

    return (
        <Fragment>
            <h1 className="large">
                Edit Your Profile
            </h1>
            <p className="lead">
                <i className="fas fa-user para3"></i> Let's find out more about you!
            </p>
            <form className="form" onSubmit={onSubmit}>
                <div className="form-group">
                    <textarea placeholder="Bio" name="bio" className="textarea" value={bio} onChange={onChange}></textarea>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Location" name="location" value={location} onChange={onChange} />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Services (please separate each service with a comma)" name="services" value={services} onChange={onChange} />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Email" name="email" value={email} onChange={onChange} />
                </div>
                <div className="form-group social-input">
                <i className="fab fa-twitter fa-2x"></i>
                <input type="text" placeholder="Twitter URL" name="twitter" value={twitter} onChange={onChange}/>
                </div>

                <div className="form-group social-input">
                <i className="fab fa-facebook fa-2x"></i>
                <input type="text" placeholder="Facebook URL" name="facebook" value={facebook} onChange={onChange} />
                </div>

                <div className="form-group social-input">
                <i className="fab fa-youtube fa-2x"></i>
                <input type="text" placeholder="YouTube URL" name="youtube" value={youtube} onChange={onChange} />
                </div>

                <div className="form-group social-input">
                <i className="fab fa-instagram fa-2x"></i>
                <input type="text" placeholder="Instagram URL" name="instagram" value={instagram} onChange={onChange} />
                </div>
                <input type="submit" className="btn1" />
            </form>
            <button className="delete" onClick={deleteAccount}>
                Delete Account
            </button>
        </Fragment>
    )
}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, { createProfile, getCurrentProfile, deleteAccount })(withRouter(EditProfile));
