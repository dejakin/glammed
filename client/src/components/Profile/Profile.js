import React, { useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileEditButton from './ProfileEditButton';
import { getCurrentProfile } from '../../actions/profile';

const Profile = ({ getCurrentProfile, auth: { user }, profile: { profile, loading } }) => {
    useEffect(() => {
        getCurrentProfile();
    }, []);

    /* If getCurrentProfile is yet to return, the spinner will show.
    Once returned, welcome message with username will show */
    return loading && profile === null ? <Spinner /> : <Fragment>
        <h1 className="large">PROFILE</h1>
        <p className="para2">
            <i className="fas fa-user"></i> Welcome <b>{ user && user.username }</b>!
        </p>
        { profile !== null ? (
            <Fragment>
                <ProfileEditButton />
            </Fragment>
        ) : (
            <Fragment>
                <p className="para3">You have created a profile yet. Please click the button below to get started.</p>
                <Link to='/create-profile' className='btn1'>
                    Create Profile
                </Link>
            </Fragment>
        ) }
    </Fragment>;
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, { getCurrentProfile })(Profile);
