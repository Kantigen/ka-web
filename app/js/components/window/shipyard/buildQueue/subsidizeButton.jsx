'use strict';

import PropTypes from 'prop-types';

import React from 'react';

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

export default SubsidizeButton;
