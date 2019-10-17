'use strict';

var React = require('react');
var createReactClass = require('create-react-class');
var Reflux = require('reflux');

var MailWindowStore = require('js/stores/windows/mail');

var MailWindow = createReactClass({
    displayName: 'MailWindow',
    mixins: [Reflux.connect(MailWindowStore, 'mailWindow')],

    render: function() {
        if (this.state.mailWindow.show) {
            YAHOO.lacuna.Messaging.show();
        }

        // TODO: make this into a React component!!

        return <div></div>;
    },
});

module.exports = MailWindow;
