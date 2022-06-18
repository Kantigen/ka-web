import React from 'react';
import * as ReactTabs from 'react-tabs';
import _ from 'lodash';

type Props = {
  tabs: Array<{
    title: string;
    component: Function;
    shouldRender?: boolean;
  }>;
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

export { Tabber };
