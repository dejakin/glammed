import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>
                <Link to='/'> G L A M M E D</Link>
            </h1>
            <ul>
                <li><Link to='/profiles'>Beauticians</Link></li>
                <li><Link to='/register'>Register</Link></li>
                <li><Link to='/login'>Login</Link></li>
            </ul>
        </nav>
    )
}

export default Navbar;