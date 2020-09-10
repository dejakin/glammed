import React, { useEffect, Fragment } from 'react'
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getCurrentProfile } from '../../actions/profile';

const Profile = ({ getCurrentProfile, auth, profile: { profile, loading } }) => {
    useEffect(() => {
        getCurrentProfile();
    }, []);

    return loading && profile === null ? <Spinner /> : <Fragment>test</Fragment>;
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, { getCurrentProfile })(Profile);
