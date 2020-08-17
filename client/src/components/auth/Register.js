import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {

    const [formData, setFormData] = useState({
        forename: '',
        surname: '',
        username: '',
        email: '',
        password: '',
        password2: ''
    });

    const { forename, surname, email, password, password2 } = formData;
    
    return (
        <Fragment>
            <h1 className="large">REGISTER</h1>
            <p><i className="fas fa-user"></i>Create Your Account</p>
            <form className="form" action="create-profile.html">
                <div className="form-section">
                    <input type="text" placeholder="First Name" name="forename" required />
                </div>
                <div className="form-section">
                    <input type="text" placeholder="Last Name" name="surname" required />
                </div>
                <div className="form-section">
                    <input type="text" placeholder="Username" name="username" required />
                </div>
                <div className="form-section">
                    <input type="email" placeholder="Email Address" name="email" />
                </div>
                <div className="form-section">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        minLength="8"
                    />
                </div>
                <div className="form-section">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="password2"
                        minLength="8"
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

export default Register;