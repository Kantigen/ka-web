'use strict';

var PropTypes = require('prop-types');

var React = require('react');
var createReactClass = require('create-react-class');
var Reflux = require('reflux');

var TickerStore = require('js/stores/ticker');

var CountdownTimer = createReactClass({
    displayName: 'CountdownTimer',

    propTypes: {
        endDate: PropTypes.string,
    },

    mixins: [Reflux.connect(TickerStore, 'ticker')],

    render: function() {
        return <div>{this.props.endDate}</div>;
    },
});

module.exports = CountdownTimer;
