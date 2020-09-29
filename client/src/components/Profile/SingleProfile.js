import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfileByUsername } from '../../actions/profile';

const SingleProfile = (props) => {
    useEffect(() => {
        props.getProfileByUsername(props.match.params.id);
    }, []);

    return (
        <div>
            profile
        </div>
    )
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
})

export default connect(mapStateToProps, { getProfileByUsername })(SingleProfile);