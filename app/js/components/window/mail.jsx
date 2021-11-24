'use strict';

var React = require('react');
var { observer } = require('mobx-react');

class MailWindow extends React.Component {
    static options = {
        title: 'Mail',
        width: 600,
        height: 400,
    };

    render() {
        return <div>This is the mail window.</div>;
    }
}

module.exports = observer(MailWindow);
