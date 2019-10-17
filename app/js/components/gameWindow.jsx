const React = require('react');
const ReactTooltip = require('react-tooltip');

const LeftSidebar = require('js/components/menu/leftSidebar');
const RightSidebar = require('js/components/menu/rightSidebar');
const Map = require('js/components/menu/map');
const Menu = require('js/components/menu');
const WindowManager = require('js/components/windowManager');

const MailWindow = require('js/components/window/mail');
const OptionsWindow = require('js/components/window/options');
const StatsWindow = require('js/components/window/stats');

//
// This React component will be the main container of everything that appears on the screen.
//

const GameWindow = () => (
    <div
        id='sidebarContainer'
        style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
        }}
    >
        <LeftSidebar />
        <RightSidebar />

        {/* One container to rule them all... */}
        <div className='pusher'>
            {/*
                        This sets all the tooltips in the entire client.
                        See http://npmjs.org/package/react-tooltip for usage.
                    */}
            <ReactTooltip effect='solid' place='bottom' type='dark' />
            <Menu />
            <Map />
            <div id='content'></div> {/* This div is used by map. */}
            <WindowManager />
            <MailWindow />
            <OptionsWindow />
            <StatsWindow />
        </div>
    </div>
);

module.exports = GameWindow;
