const React = require('react');
const ReactTooltip = require('react-tooltip');

const LeftSidebar = require('app/js/components/menu/leftSidebar');
const RightSidebar = require('app/js/components/menu/rightSidebar');
const Map = require('app/js/components/menu/map');
const Menu = require('app/js/components/menu');
const WindowManager = require('app/js/components/windowManager');
const MailWindow = require('app/js/components/window/mail');
const StatsWindow = require('app/js/components/window/stats');
const OptionsWindow = require('app/js/components/window/options');

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
            <StatsWindow />
            <OptionsWindow />
        </div>
    </div>
);

module.exports = GameWindow;
