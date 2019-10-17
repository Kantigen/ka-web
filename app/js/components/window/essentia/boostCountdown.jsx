'use strict';

var PropTypes = require('prop-types');

var React = require('react');
var classnames = require('classnames');

class BoostCountdown extends React.Component {
    static propTypes = {
        boost: PropTypes.object.isRequired,
    };

    static defaultProps = {
        boost: {
            ms: 0,
            display: '',
        },
    };

    render() {
        if (this.props.boost && this.props.boost.ms > 0) {
            var day = 1000 * 60 * 60 * 24; // Milliseconds per day
            var ms = this.props.boost.ms;

            // Change the color of the tags as the countdown gets closer to zero.
            var className = classnames('ui left pointing label', {
                green: ms > 3 * day, // More than three days
                yellow: 3 * day > ms && ms > day, // Less than three days and more than one day
                red: day > ms, // Less than one day
            });

            return <div className={className}>{this.props.boost.display}</div>;
        } else {
            return <div></div>;
        }
    }
}

module.exports = BoostCountdown;
