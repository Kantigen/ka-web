'use strict';

var React = require('react');
var { observer } = require('mobx-react');
var OptionsWindowStore = require('js/stores/windows/options');

class OptionsWindow extends React.Component {
    render() {
        if (OptionsWindowStore.shown) {
            YAHOO.lacuna.Profile.show();
        }

        // TODO: make this into a React component!!

        return <div></div>;
    }
}

module.exports = observer(OptionsWindow);
