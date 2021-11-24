'use strict';

var React = require('react');
var { observer } = require('mobx-react');

class OptionsWindow extends React.Component {
    static options = {
        title: 'Options',
        width: 600,
        height: 400,
    };

    render() {
        return <div>This is the options window.</div>;
    }
}

module.exports = observer(OptionsWindow);
