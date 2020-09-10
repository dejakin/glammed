import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';

const Profile = ({ getCurrentProfile, auth, profile }) => {
    useEffect(() => {
        getCurrentProfile();
    }, []);

    return <div>Profile</div>
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, { getCurrentProfile })(Profile);
