var React = require('react');
var { observer } = require('mobx-react');
var _ = require('lodash');

var WindowsStore = require('app/js/stores/windows');
var Panel = require('app/js/components/window/panel');

const WINDOW_MAP = {
    about: require('app/js/components/window/about'),
    essentia: require('app/js/components/window/essentia'),
    genericBuilding: require('app/js/components/window/genericBuilding'),
    invite: require('app/js/components/window/invite'),
    planetPanel: require('app/js/components/window/planetPanel'),
    serverClock: require('app/js/components/window/serverClock'),
    starPanel: require('app/js/components/window/starPanel'),
};

class WindowManager extends React.Component {
    render() {
        return (
            <React.Fragment>
                {_.map(WindowsStore.windows, function(row, index) {
                    return (
                        <Panel
                            window={WINDOW_MAP[row.type]}
                            type={row.type}
                            options={row.options}
                            zIndex={row.zIndex}
                            key={index}
                        />
                    );
                })}
            </React.Fragment>
        );
    }
}

module.exports = observer(WindowManager);
