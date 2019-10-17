var React = require('react');
var createReactClass = require('create-react-class');
var Reflux = require('reflux');
var _ = require('lodash');

var WindowsStore = require('js/stores/windows');
var Panel = require('js/components/window/panel');

var WindowManager = createReactClass({
    displayName: 'WindowManager',
    mixins: [Reflux.connect(WindowsStore, 'windows')],

    render: function() {
        return (
            <React.Fragment>
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
            </React.Fragment>
        );
    },
});

module.exports = WindowManager;
