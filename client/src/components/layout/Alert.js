import React from 'react';
import { connect } from 'react-redux';

const Alert = (props) => {
    if(props.alerts !== null && props.alerts.length > 0) {
        return props.alerts.map(alert => (
            <div className="alert-box" key={alert.id}>
                { alert.msg }
            </div>
        ))
    } else {
        return null;
    }
}

const mapStateToProps = state => ({
    alerts: state.alert
})

export default connect(mapStateToProps)(Alert);