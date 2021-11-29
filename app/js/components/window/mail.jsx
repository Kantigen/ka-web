'use strict';

var React = require('react');
var { observer } = require('mobx-react');
var MailWindowStore = require('js/stores/window/mail');

class MailWindow extends React.Component {
    render() {
        if (MailWindowStore.shown) {
            YAHOO.lacuna.Messaging.show();
        }

        return <div></div>;
    }
}

module.exports = observer(MailWindow);
