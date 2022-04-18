'use strict';

import React from 'react';
import PropTypes from 'prop-types';

class CountdownTimer extends React.Component {
    render() {
        return <div>{this.props.endDate}</div>;
    }
}

CountdownTimer.propTypes = {
    endDate: PropTypes.string,
};

export default CountdownTimer;
