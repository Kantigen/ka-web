'use strict';

var React = require('react');
var { observer } = require('mobx-react');
var OptionsWindowStore = require('js/stores/window/options');

class OptionsWindow extends React.Component {
    render() {
        if (OptionsWindowStore.shown) {
            YAHOO.lacuna.Profile.show();
        }

        return <div></div>;
    }
}

module.exports = observer(OptionsWindow);
