import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    }); 

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = async e => {
        e.preventDefault();
        console.log('SUCCESS');
    };

    return (
        <Fragment>
            <h1 className="large">SIGN IN</h1>
            <p><i className="fas fa-user"></i>Login to your account</p>
            <form className="form" onSubmit={onSubmit}>
                <div className="form-section">
                    <input 
                        type="email" 
                        placeholder="Email Address" 
                        name="email" 
                        onChange={onChange}
                        required 
                    />
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
                <input type="submit" className="btn1" value="SIGN IN" />
            </form>
            <p className="note">
                Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
        </Fragment>
    )
}

export default Login;