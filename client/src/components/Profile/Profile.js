import React, { useEffect, Fragment } from 'react'
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getCurrentProfile } from '../../actions/profile';

const Profile = ({ getCurrentProfile, auth: { user }, profile: { profile, loading } }) => {
    useEffect(() => {
        getCurrentProfile();
    }, []);

    return loading && profile === null ? <Spinner /> : <Fragment>
        <h1 className="large">PROFILE</h1>
        <p>
            <i className='fas fa-user'></i> Welcome <b>{ user && user.username }</b>
        </p>
    </Fragment>;
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, { getCurrentProfile })(Profile);
