import React from 'react';

import { Tab, Tabs } from 'app/js/components/tabber';

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
        let tabs = [];
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

export default StarPanel;
