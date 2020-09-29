import React, { Fragment, useEffect } from 'react';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';
import { getProfiles } from '../../actions/profile';
import { connect } from 'react-redux';

const Profiles = (props) => {
    useEffect(() => {
        props.getProfiles();
    }, [props]);

    return <Fragment>
        { props.loading ? <Spinner /> : <Fragment>
            <h1 className="large">Beauticians</h1>
            <p className="para3">
                <i className="fab fa-connectdevelop"></i> Browse and connect with beauticians!
            </p>
            <div>
                {props.profiles.length > 0 ? 
                    props.profiles.map((profile) => 
                        <ProfileItem key={profile._id} profile={profile}/>
                    )
                : <h4>No profiles found</h4>}
            </div>
        </Fragment> }
    </Fragment>
}

const mapStateToProps = state => ({
    loading: state.profile.loading,
    profiles: state.profile.profiles
})

export default connect(mapStateToProps, { getProfiles })(Profiles);
