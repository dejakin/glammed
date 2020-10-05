import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const Welcome = (props) => {
    if(props.isAuthenticated) {
        return <Redirect to="/profile" />
    }

    return (
        <section className="welcome">
            <div className="dark-bg">
                <div className="welcome-inner">
                    <h1 className="x-large">Welcome to Glammed</h1>
                    <p className="para">
                        Create a beautician profile - share your work and get noticed by potential customers and students within the Southampton area
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

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Welcome);