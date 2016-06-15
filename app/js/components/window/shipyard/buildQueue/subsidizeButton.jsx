'use strict';

var React               = require('react');

var SubsidizeButton = React.createClass({

    propTypes : {
        obj        : React.PropTypes.object.isRequired,
        buildingId : React.PropTypes.number.isRequired
    },

    render : function() {

        return (
            <div className="ui fluid action input">
                <div className="ui green button" >
                    Subsidize, 23E
                </div>
            </div>
        );
    }
});

module.exports = SubsidizeButton;
