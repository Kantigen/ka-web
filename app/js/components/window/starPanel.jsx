'use strict';

var React = require('react');

var Tabber = require('app/js/components/tabber');

var Tabs = Tabber.Tabs;
var Tab = Tabber.Tab;

class StarPanel extends React.Component {
    static options = {
        title: 'Star Details',
        width: 700,
        height: 420,
    };

    closeWindow() {
        WindowActions.windowCloseByType('planetPanel');
    }

    render() {
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
    }
}

module.exports = StarPanel;
