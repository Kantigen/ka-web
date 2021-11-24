'use strict';

var PropTypes = require('prop-types');
var React = require('react');

class CountdownTimer extends React.Component {
    render() {
        return <div>{this.props.endDate}</div>;
    }
}

CountdownTimer.propTypes = {
    endDate: PropTypes.string,
};

module.exports = CountdownTimer;
