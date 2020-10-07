import React, { Fragment, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createProfile } from '../../actions/profile';

const CreateProfile = ({ createProfile, history }) => {
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

const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});
const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history)
}

    return (
        <Fragment>
            <h1 className="large">
                Create Your Profile
            </h1>
            <p className="lead">
                <i className="fas fa-user para3"></i> Let's find out more about you!
            </p>
            <form className="form" onSubmit={onSubmit}>
                <div className="form-group">
                    <textarea placeholder="Bio" name="bio" className="textarea" onChange={onChange}></textarea>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Location" name="location" onChange={onChange} />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Services (please separate each service with a comma)" name="services" onChange={onChange} />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Email" name="email" onChange={onChange} />
                </div>
                <div className="form-group social-input">
                <i className="fab fa-twitter fa-2x"></i>
                <input type="text" placeholder="Twitter URL" name="twitter" onChange={onChange}/>
                </div>

                <div className="form-group social-input">
                <i className="fab fa-facebook fa-2x"></i>
                <input type="text" placeholder="Facebook URL" name="facebook" onChange={onChange} />
                </div>

                <div className="form-group social-input">
                <i className="fab fa-youtube fa-2x"></i>
                <input type="text" placeholder="YouTube URL" name="youtube" onChange={onChange} />
                </div>

                <div className="form-group social-input">
                <i className="fab fa-instagram fa-2x"></i>
                <input type="text" placeholder="Instagram URL" name="instagram" onChange={onChange} />
                </div>
                <input type="submit" className="btn1" />
            </form>
        </Fragment>
    )
}

export default connect(null, { createProfile })(withRouter(CreateProfile));
