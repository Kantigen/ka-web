import React from 'react';
import ReactTooltip from 'react-tooltip';

import LeftSidebar from 'app/components/menu/leftSidebar';
import RightSidebar from 'app/components/menu/rightSidebar';
import Map from 'app/components/menu/map';
import Menu from 'app/components/menu';
import WindowManager from 'app/components/menu/windowManager';
import MailWindow from 'app/components/mail';
import StatsWindow from 'app/components/stats';
import OptionsWindow from 'app/components/options';
import ErrorBoundary from 'app/components/errorBoundary';

//
// This React component will be the main container of everything that appears on the screen.
//

const GameWindow: React.FunctionComponent = () => (
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
    <ErrorBoundary>
      <LeftSidebar />
      <RightSidebar />
    </ErrorBoundary>

    {/* One container to rule them all... */}
    <div className='pusher'>
      {/*
                        This sets all the tooltips in the entire client.
                        See http://npmjs.org/package/react-tooltip for usage.
                    */}
      <ReactTooltip effect='solid' place='bottom' type='dark' />
      <ErrorBoundary>
        <Menu />
        <Map />
      </ErrorBoundary>
      <div id='content' /> {/* This div is used by map. */}
      <ErrorBoundary>
        <WindowManager />
        <MailWindow />
        <StatsWindow />
        <OptionsWindow />
      </ErrorBoundary>
    </div>
  </div>
);

export default GameWindow;
