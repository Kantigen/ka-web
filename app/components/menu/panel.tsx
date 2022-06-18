import PropTypes from 'prop-types';

import WindowsStore from 'app/stores/windows';

import React from 'react';
import $ from 'app/shims/jquery';
import Draggable from 'react-draggable';

import PanelHeader from 'app/components/menu/panel/panelHeader';
import PanelContent from 'app/components/menu/panel/panelContent';

import { WindowType, WindowOptions, WindowDefinition } from 'app/interfaces';

type Props = {
  zIndex: number;
  type: WindowType;
  options: WindowOptions;
  window: WindowDefinition;
};

class Panel extends React.Component<Props> {
  static propTypes = {
    type: PropTypes.string,
    zIndex: PropTypes.number,
    options: PropTypes.object,
    window: PropTypes.object,
  };

  onBringToTop() {
    WindowsStore.bringToTop(this.props.type);
  }

  closeWindow() {
    WindowsStore.close(this.props.type);
  }

  handleCentering() {
    return ($(window.document).width() - this.props.window.config.width) / 2;
  }

  render() {
    return (
      <Draggable handle='.drag-handle'>
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
            title={this.props.window.config.title}
            closable={
              typeof this.props.window.config.closable === 'boolean'
                ? this.props.window.config.closable
                : true
            }
            panelWidth={this.props.window.config.width}
            onClose={() => this.closeWindow()}
          />

          <PanelContent
            panelWidth={this.props.window.config.width}
            panelHeight={this.props.window.config.height}
          >
            <div style={{ marginTop: 10, marginBottom: 10 }}>
              <this.props.window.component options={this.props.options} />
            </div>
          </PanelContent>
        </div>
      </Draggable>
    );
  }
}

export default Panel;
