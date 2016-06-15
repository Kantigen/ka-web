'use strict';

var React                     = require('react');
var Reflux                    = require('reflux');

var BodyRPCGetBodyStatusStore = require('js/stores/rpc/body/getBodyStatus');

var PlanetDetails = React.createClass({

    propTypes : {
        title : React.PropTypes.string.isRequired,
        value : React.PropTypes.string.isRequired
    },

    mixins : [
        Reflux.connect(BodyRPCGetBodyStatusStore, 'bodyRPCGetBodyStatusStore')
    ],

    render : function() {
        return (
            <div>
                {this.props.title}:
                <span style={{
                    float : 'right'
                }}>
                    {this.props.value}
                </span>
            </div>
        );
    }
});

module.exports = PlanetDetails;
