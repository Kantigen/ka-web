'use strict';

var PropTypes = require('prop-types');

var React = require('react');
var createReactClass = require('create-react-class');

var PlanetDetails = createReactClass({
    displayName: 'PlanetDetails',

    propTypes: {
        title: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
    },

    render: function() {
        return (
            <div>
                {this.props.title}:
                <span
                    style={{
                        float: 'right',
                    }}
                >
                    {this.props.value}
                </span>
            </div>
        );
    },
});

module.exports = PlanetDetails;
