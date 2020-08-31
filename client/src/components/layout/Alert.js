import React from 'react';
import { connect } from 'react-redux';

const Alert = (props) => {
    if(props.alerts !== null && props.alerts > 0) {
        return props.alerts.map(alert => (
            <div key={alert.id}>
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