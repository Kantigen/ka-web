'use strict';

var PropTypes = require('prop-types');

var React = require('react');

class SubsidizeButton extends React.Component {
    static propTypes = {
        obj: PropTypes.object.isRequired,
        buildingId: PropTypes.number.isRequired,
    };

    render() {
        return (
            <div className='ui fluid action input'>
                <div className='ui green button'>Subsidize, 23E</div>
            </div>
        );
    }
}

module.exports = SubsidizeButton;
