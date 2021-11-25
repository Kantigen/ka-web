'use strict';

var React = require('react');

var AboutTab = require('js/components/window/about/aboutTab');
var CreditsTab = require('js/components/window/about/creditsTab');

var { Tabs, Tab } = require('js/components/tabber');

var WindowsStore = require('js/stores/windows');

class AboutWindow extends React.Component {
    static options = {
        title: 'About',
        width: 450,
        height: 400,
    };

    closeWindow() {
        WindowsStore.close('about');
    }

    render() {
        return (
            <Tabs>
                <Tab title='About'>
                    <AboutTab />
                </Tab>

                <Tab title='Credits'>
                    <CreditsTab />
                </Tab>
            </Tabs>
        );
    }
}

module.exports = AboutWindow;
