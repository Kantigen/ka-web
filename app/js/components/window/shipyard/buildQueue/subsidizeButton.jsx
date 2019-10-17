'use strict';

var PropTypes = require('prop-types');

var React = require('react');

var SubsidizeButton = React.createClass({
    propTypes: {
        obj: PropTypes.object.isRequired,
        buildingId: PropTypes.number.isRequired,
    },

    render: function() {
        return (
            <div className='ui fluid action input'>
                <div className='ui green button'>Subsidize, 23E</div>
            </div>
        );
    },
});

module.exports = SubsidizeButton;
