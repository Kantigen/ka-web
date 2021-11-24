'use strict';

var React = require('react');
var { observer } = require('mobx-react');
var MailWindowStore = require('js/stores/windows/mail');

class MailWindow extends React.Component {
    render() {
        if (MailWindowStore.shown) {
            YAHOO.lacuna.Messaging.show();
        }

        // TODO: make this into a React component!!

        return <div></div>;
    }
}

module.exports = observer(MailWindow);
