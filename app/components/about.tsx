import React from 'react';

import AboutTab from 'app/components/about/aboutTab';
import CreditsTab from 'app/components/about/creditsTab';

import { Tabs, Tab } from 'app/components/tabber';

import WindowsStore from 'app/stores/windows';

class AboutWindow extends React.Component {
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

export default AboutWindow;
