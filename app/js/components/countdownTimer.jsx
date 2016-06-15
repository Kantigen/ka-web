'use strict';

var React           = require('react');
var Reflux          = require('reflux');

var TickerStore     = require('js/stores/ticker');

var CountdownTimer = React.createClass({

    propTypes : {
        endDate : React.PropTypes.string
    },

    mixins : [
        Reflux.connect(TickerStore, 'ticker')
    ],

    render : function() {
        return (
            <div>
              {this.props.endDate}
            </div>
        );
    }
});

module.exports = CountdownTimer;
