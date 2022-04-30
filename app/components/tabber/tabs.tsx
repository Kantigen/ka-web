import PropTypes from 'prop-types';

import React from 'react';
import _ from 'lodash';
import * as ReactTabs from 'react-tabs';

import { TabProps } from 'app/components/tabber/tab';

interface CallbackMap {
  [index: number]: Function;
}

type Props = {
  initialTab: number;
  children: React.ReactElement<TabProps> | Array<React.ReactElement<TabProps>>;
};

type State = {
  selectedTab: number;
};

class Tabs extends React.Component<Props, State> {
  static propTypes = {
    initialTab: PropTypes.number,
    onSelect: PropTypes.object,
    children: PropTypes.node,
  };

  static defaultProps = {
    initialTab: 0,
  };

  state = {
    selectedTab: this.props.initialTab,
  };

  componentDidMount() {
    this.handleCallbacks(this.state.selectedTab);
  }

  handleSelect(index: number) {
    this.handleCallbacks(index);
    this.setState({
      selectedTab: index,
    });
  }

  getCallbacks(): CallbackMap {
    const obj: CallbackMap = {};
    let i = 0;

    React.Children.forEach(this.props.children, (child) => {
      if (child?.props?.onSelect) {
        obj[i] = child.props.onSelect;
      }

      i += 1;
    });

    return obj;
  }

  handleCallbacks(index: number): void {
    const callbacks: CallbackMap = this.getCallbacks();

    if (callbacks[index]) {
      callbacks[index]();
    }
  }

  render() {
    const tabTitles: string[] = [];
    const tabContents: React.ReactNode[] = [];

    React.Children.forEach(this.props.children, (child) => {
      if (child && child.props && child.props.title && child.props.children) {
        tabTitles.push(child.props.title);
        tabContents.push(child.props.children);
      }
    });

    return (
      <ReactTabs.Tabs
        selectedIndex={this.state.selectedTab}
        onSelect={(index: number) => this.handleSelect(index)}
      >
        <ReactTabs.TabList>
          {_.map(tabTitles, (title) => (
            <ReactTabs.Tab key={title}>{title}</ReactTabs.Tab>
          ))}
        </ReactTabs.TabList>

        {_.map(tabContents, (tabContent, i) => {
          const title = tabTitles[i];

          return <ReactTabs.TabPanel key={title}>{tabContent}</ReactTabs.TabPanel>;
        })}
      </ReactTabs.Tabs>
    );
  }
}

export default Tabs;
