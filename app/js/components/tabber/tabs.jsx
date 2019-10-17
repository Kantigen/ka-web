'use strict';

var PropTypes = require('prop-types');

var React = require('react');
var _ = require('lodash');
var ReactTabs = require('react-tabs');

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
        var obj = {};
        var i = 0;

        React.Children.forEach(this.props.children, function(child) {
            if (!child) {
                return;
            }

            if (child.props && typeof child.props.onSelect === 'function') {
                obj[i] = child.props.onSelect;
            }

            i += 1;
        });

        return obj;
    };

    handleCallbacks = (index) => {
        var callbacks = this.getCallbacks();

        if (callbacks && typeof callbacks[index] === 'function') {
            callbacks[index]();
        }
    };

    render() {
        var tabTitles = [];
        var tabContents = [];

        React.Children.forEach(this.props.children, function(child) {
            if (child.props && child.props.title && child.props.children) {
                tabTitles.push(child.props.title);
                tabContents.push(child.props.children);
            }
        });

        return (
            <ReactTabs.Tabs
                selectedIndex={this.state.selectedTab}
                onSelect={this.handleSelect}
            >
                <ReactTabs.TabList>
                    {_.map(tabTitles, function(title) {
                        return (
                            <ReactTabs.Tab key={title}>{title}</ReactTabs.Tab>
                        );
                    })}
                </ReactTabs.TabList>

                {_.map(tabContents, function(tabContent, i) {
                    var title = tabTitles[i];

                    return (
                        <ReactTabs.TabPanel key={title}>
                            {tabContent}
                        </ReactTabs.TabPanel>
                    );
                })}
            </ReactTabs.Tabs>
        );
    }
}

module.exports = Tabs;
