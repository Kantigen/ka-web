'use strict';

var React = require('react');
var createReactClass = require('create-react-class');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var Reflux = require('reflux');
var _ = require('lodash');

var WindowsStore = require('js/stores/windows');
var Panel = require('js/components/window/panel');

var WindowManager = createReactClass({
    displayName: 'WindowManager',
    mixins: [Reflux.connect(WindowsStore, 'windows')],

    render: function() {
        return (
            <ReactCSSTransitionGroup
                transitionName='fade'
                transitionAppearTimeout={200}
                transitionEnterTimeout={200}
                transitionLeaveTimeout={200}
                transitionAppear
            >
                {_.map(this.state.windows.windows, function(row, index) {
                    if (row && row.window) {
                        return (
                            <Panel
                                window={row.window}
                                type={row.type}
                                options={row.options}
                                zIndex={row.zIndex}
                                key={index}
                            />
                        );
                    }
                })}
            </ReactCSSTransitionGroup>
        );
    },
});

module.exports = WindowManager;
