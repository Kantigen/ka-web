'use strict';

import PropTypes from 'prop-types';

import WindowsStore from 'app/js/stores/windows';

import React from 'react';
import Draggable from 'react-draggable';

import PanelHeader from 'app/js/components/window/panel/panelHeader';
import PanelContent from 'app/js/components/window/panel/panelContent';

class Panel extends React.Component {
    static propTypes = {
        type: PropTypes.string,
        zIndex: PropTypes.number,
        options: PropTypes.object,
        window: PropTypes.func,
    };

    onBringToTop() {
        WindowsStore.bringToTop(this.props.type);
    }

    closeWindow() {
        WindowsStore.close(this.props.type);
    }

    handleCentering() {
        return ($(window.document).width() - this.props.window.options.width) / 2;
    }

    render() {
        var subPanel = React.createElement(this.props.window, {
            zIndex: this.props.zIndex,
            options: this.props.options,
        });

        return (
            <Draggable handle='.drag-handle' zIndex={this.props.zIndex}>
                <div
                    ref='container'
                    style={{
                        position: 'absolute',
                        zIndex: this.props.zIndex,
                        left: this.handleCentering(),
                    }}
                    onClick={() => this.onBringToTop()}
                >
                    <PanelHeader
                        title={this.props.window.options.title}
                        panelWidth={this.props.window.options.width}
                        onClose={() => this.closeWindow()}
                    />

                    <PanelContent
                        panelWidth={this.props.window.options.width}
                        panelHeight={this.props.window.options.height}
                    >
                        {subPanel}
                    </PanelContent>
                </div>
            </Draggable>
        );
    }
}

export default Panel;
