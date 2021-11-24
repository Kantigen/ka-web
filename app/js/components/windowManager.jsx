var React = require('react');
var { observer } = require('mobx-react');
var _ = require('lodash');

var WindowsStore = require('js/stores/windows');
var Panel = require('js/components/window/panel');

const WINDOW_MAP = {
    essentia: require('js/components/window/essentia'),
    mail: require('js/components/window/mail'),
    options: require('js/components/window/options'),
    stats: require('js/components/window/stats'),
    genericBuilding: require('js/components/window/genericBuilding'),
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
