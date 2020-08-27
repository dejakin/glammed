import React from 'react';
import { Link } from 'react-router-dom';

const Welcome = () => {
    return (
        <section className="welcome">
            <div className="dark-bg">
                <div className="welcome-inner">
                    <h1 className="x-large">Welcome to Glammed</h1>
                    <p className="para">
                        Create a beautician profile - share your work and get noticed by potential customers
                    </p>
                    <div className="buttons">
                        <Link to='/register' className="btn1">SIGN UP</Link>
                        <Link to='/login' className="btn2">LOGIN</Link>
                    </div>
                </div>
            </div>
        </section> 
    )
}

export default Welcome;