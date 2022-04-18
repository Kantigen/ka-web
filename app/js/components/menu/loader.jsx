'use strict';

var React = require('react');
var { observer } = require('mobx-react');
var MenuStore = require('app/js/stores/menu');

var classNames = require('classnames');

class Loader extends React.Component {
    render() {
        return (
            <div
                className={classNames('ui large loader', {
                    active: MenuStore.loaderShown,
                })}
                style={{
                    zIndex: 9999999999,
                    top: '40vh',
                }}
            ></div>
        );
    }
}

module.exports = observer(Loader);
