import PropTypes from 'prop-types';

import React from 'react';

type Props = {
  panelWidth: number;
  onClose: Function;
  title: string;
  closable: boolean;
};

class PanelHeader extends React.Component<Props> {
  static propTypes = {
    panelWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    closable: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div
        className='drag-handle'
        style={{
          backgroundColor: '#1c2f50',
          border: '1px solid black',
          borderBottom: 0, // Avoid the border appearing thicker on the bottom edge.
          borderTopLeftRadius: 7,
          borderTopRightRadius: 7,
          color: '#FFD800',
          cursor: 'move',
          fontSize: '110%',
          fontWeight: 'bold',
          lineHeight: '1.75',
          marginLeft: 10,
          paddingLeft: 10,
          width: this.props.panelWidth - 20,

          // Prevent anyone from selecting the text.
          MozUserSelect: 'none',
          WebkitUserSelect: 'none',
          msUserSelect: 'none',
        }}
      >
        <span className='drag-handle'>{this.props.title}</span>

        {this.props.closable ? (
          <span
            onClick={(e) => this.props.onClose(e)}
            style={{
              position: 'absolute',
              right: 30,
              display: 'inline-block',
              cursor: 'pointer',
            }}
          >
            X
          </span>
        ) : undefined}
      </div>
    );
  }
}

export default PanelHeader;
