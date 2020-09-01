import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setAlert } from '../../actions/alert';


const Register = props => {

    const [formData, setFormData] = useState({
        forename: '',
        surname: '',
        username: '',
        email: '',
        password: '',
        password2: ''
    }); 

    const { forename, surname, username, email, password, password2 } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = async e => {
        e.preventDefault();
        if(password !== password2) {
            props.setAlert('Passwords do not match');
        } else {
            console.log('SUCCESS');
        }
    };

    return (
        <Fragment>
            <h1 className="large">REGISTER</h1>
            <p><i className="fas fa-user"></i>Create Your Account</p>
            <form className="form" onSubmit={onSubmit}>
                <div className="form-section">
                    <input 
                        type="text" 
                        placeholder="First Name" 
                        name="forename" 
                        onChange={onChange}
                        required />
                </div>
                <div className="form-section">
                    <input 
                        type="text" 
                        placeholder="Last Name" 
                        name="surname" 
                        onChange={onChange}
                        required />
                </div>
                <div className="form-section">
                    <input 
                        type="text" 
                        placeholder="Username" 
                        name="username" 
                        onChange={onChange}
                        required />
                </div>
                <div className="form-section">
                    <input 
                        type="email" 
                        placeholder="Email Address" 
                        name="email" 
                        onChange={onChange}
                        required />
                </div>
                <div className="form-section">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={onChange}
                        minLength="8"
                        required
                    />
                </div>
                <div className="form-section">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="password2"
                        onChange={onChange}
                        minLength="8"
                        required
                    />
                </div>
                <input type="submit" className="btn1" value="Register" />
            </form>
            <p className="note">
                Already have an account? <Link to="/login">Sign In</Link>
            </p>
        </Fragment>
    )
}

export default connect(null, { setAlert })(Register);

