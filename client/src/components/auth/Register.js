import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Register = () => {

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
            console.log('Passwords do not match');
        } else {
            const newUser = {
                forename,
                surname,
                username,
                email,
                password
            }

            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }

                const body = JSON.stringify(newUser);

                const res = await axios.post('/api/users', body, config);
                console.log(res.data)
            } catch(err) {
                console.error(err.response.data);
            }
        }
    }

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

export default Register;