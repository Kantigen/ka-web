'use strict';

var PropTypes = require('prop-types');

var React = require('react');

var ResourceLine = require('js/components/window/building/resourceLine');

var util = require('js/util');

var ResourceProduction = React.createClass({
    propTypes: {
        icon: PropTypes.string.isRequired,
        number: PropTypes.number.isRequired,
    },

    render: function() {
        return (
            <ResourceLine
                icon={this.props.icon}
                content={util.reduceNumber(this.props.number) + ' / hr'}
                title={util.commify(this.props.number)}
            />
        );
    },
});

module.exports = ResourceProduction;
