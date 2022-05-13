import React from 'react';
import * as ReactTabs from 'react-tabs';
import _ from 'lodash';

import Tab from 'app/components/tabber/tab';
import Tabs from 'app/components/tabber/tabs';

interface ITab {
  title: string;
  component: Function;
  shouldRender?: boolean;
}

type Props = {
  tabs: Array<ITab>;
};

class Tabber extends React.Component<Props> {
  render() {
    const titles = [];
    const tabs = [];

    for (const tab of this.props.tabs) {
      if (tab.shouldRender !== false) {
        titles.push(<ReactTabs.Tab key={tab.title}>{tab.title}</ReactTabs.Tab>);
        tabs.push(<ReactTabs.TabPanel key={tab.title}>{tab.component()}</ReactTabs.TabPanel>);
      }
    }

    return (
      <ReactTabs.Tabs>
        <ReactTabs.TabList>{titles}</ReactTabs.TabList>
        {tabs}
      </ReactTabs.Tabs>
    );
  }
}

export { Tab, Tabs, Tabber };
