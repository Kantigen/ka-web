'use strict';

var React = require('react');

var createReactClass = require('create-react-class');

var WindowActions = require('js/actions/window');

var Tabber = require('js/components/tabber');

var Tabs = Tabber.Tabs;
var Tab = Tabber.Tab;

var StarPanel = createReactClass({
    displayName: 'StarPanel',

    statics: {
        options: {
            title: 'Star Details',
            width: 700,
            height: 420,
        },
    },

    mixins: [],
    componentWillMount: function() {},

    closeWindow: function() {
        WindowActions.windowCloseByType('planetPanel');
    },

    render: function() {
        var tabs = [];
        tabs.push(
            <Tab title='Star Details' key='Star Details'>
                <p>Not Yet Implemented!</p>
            </Tab>
        );

        tabs.push(
            <Tab title='My Fleets' key='My Fleets'>
                <p>Not Yet Implemented</p>
            </Tab>
        );
        tabs.push(
            <Tab title='Foreign Fleets' key='Foreign Fleets'>
                <p>Not Yet Implemented</p>
            </Tab>
        );
        return (
            <div>
                <div>
                    <Tabs>{tabs}</Tabs>
                </div>
            </div>
        );
    },
});

module.exports = StarPanel;
