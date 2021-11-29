var React = require('react');
var { observer } = require('mobx-react');
var _ = require('lodash');

var WindowsStore = require('js/stores/windows');
var Panel = require('js/components/window/panel');

const WINDOW_MAP = {
    about: require('js/components/window/about'),
    essentia: require('js/components/window/essentia'),
    genericBuilding: require('js/components/window/genericBuilding'),
    invite: require('js/components/window/invite'),
    planetPanel: require('js/components/window/planetPanel'),
    serverClock: require('js/components/window/serverClock'),
    starPanel: require('js/components/window/starPanel'),
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
