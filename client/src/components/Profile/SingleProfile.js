import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import { getProfileByUsername } from '../../actions/profile';

const SingleProfile = ({ profile: { profile, loading }, auth, match, getProfileByUsername }) => {
    useEffect(() => {
        getProfileByUsername(match.params.id);
    }, []);

    return (
        <Fragment>
            {loading ? <Spinner /> : profile ? 
            <Fragment>
                <Link to="/beauticians" className="btn1">Back To Profiles</Link>
            </Fragment> : 
            <Fragment>
                This user does not exist
            </Fragment>}
        </Fragment>
    )
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
})

export default connect(mapStateToProps, { getProfileByUsername })(SingleProfile);