import React from 'react';

import AboutTab from 'app/components/about/aboutTab';
import CreditsTab from 'app/components/about/creditsTab';

import { Tabber } from 'app/components/tabber';

import WindowsStore from 'app/stores/windows';

class AboutWindow extends React.Component {
  closeWindow() {
    WindowsStore.close('about');
  }

  render() {
    return (
      <Tabber
        tabs={[
          {
            title: 'About',
            component: () => <AboutTab />,
          },
          {
            title: 'Credits',
            component: () => <CreditsTab />,
          },
        ]}
      />
    );
  }
}

export default AboutWindow;
