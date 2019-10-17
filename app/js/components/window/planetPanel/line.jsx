'use strict';

var PropTypes = require('prop-types');

var React = require('react');
var createReactClass = require('create-react-class');
var Reflux = require('reflux');

var BodyRPCGetBodyStatusStore = require('js/stores/rpc/body/getBodyStatus');

var PlanetDetails = createReactClass({
    displayName: 'PlanetDetails',

    propTypes: {
        title: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
    },

    mixins: [
        Reflux.connect(BodyRPCGetBodyStatusStore, 'bodyRPCGetBodyStatusStore'),
    ],

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
