import PropTypes from 'prop-types';

import React from 'react';
import _ from 'lodash';
import * as ReactTabs from 'react-tabs';

class Tabs extends React.Component {
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

    handleSelect = (index) => {
        this.handleCallbacks(index);
        this.setState({
            selectedTab: index,
        });
    };

    getCallbacks = () => {
        let obj = {};
        let i = 0;

        React.Children.forEach(this.props.children, function (child) {
            if (child && child.props && typeof child.props.onSelect === 'function') {
                obj[i] = child.props.onSelect;
            }

            i += 1;
        });

        return obj;
    };

    handleCallbacks = (index) => {
        let callbacks = this.getCallbacks();

        if (callbacks && typeof callbacks[index] === 'function') {
            callbacks[index]();
        }
    };

    render() {
        let tabTitles = [];
        let tabContents = [];

        React.Children.forEach(this.props.children, function (child) {
            if (child && child.props && child.props.title && child.props.children) {
                tabTitles.push(child.props.title);
                tabContents.push(child.props.children);
            }
        });

        return (
            <ReactTabs.Tabs selectedIndex={this.state.selectedTab} onSelect={this.handleSelect}>
                <ReactTabs.TabList>
                    {_.map(tabTitles, function (title) {
                        return <ReactTabs.Tab key={title}>{title}</ReactTabs.Tab>;
                    })}
                </ReactTabs.TabList>

                {_.map(tabContents, function (tabContent, i) {
                    let title = tabTitles[i];

                    return <ReactTabs.TabPanel key={title}>{tabContent}</ReactTabs.TabPanel>;
                })}
            </ReactTabs.Tabs>
        );
    }
}

export default Tabs;
