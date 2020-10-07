import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

const Navbar = (props) => {
const authLinks = (
    <ul>
        <li><Link to='/beauticians'>Beauticians</Link></li>
        <li><Link to='/profile'>Profile</Link></li>
        <li><a onClick={props.logout} href='#!'>Logout</a></li>
    </ul>
);

const guestLinks = (
    <ul>
        <li><Link to='/beauticians'>Beauticians</Link></li>
        <li><Link to='/register'>Register</Link></li>
        <li><Link to='/login'>Login</Link></li>
    </ul>
);

    return (
        <nav className="navbar">
            <h1>
                <Link to='/'> G L A M M E D </Link>
            </h1>
            { !props.loading ? (<Fragment>{ props.isAuthenticated ? authLinks : guestLinks }</Fragment>) : null }
        </nav>
    )
}

const mapStateToProps = state => ({
    loading: state.auth.loading,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { logout })(Navbar);