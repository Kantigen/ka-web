'use strict';

var PropTypes = require('prop-types');

var React = require('react');

class PanelHeader extends React.Component {
    static propTypes = {
        panelWidth: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
        ]),

        onClose: PropTypes.func.isRequired,
        title: PropTypes.string.isRequired,
    };

    render() {
        return (
            <div
                className='drag-handle'
                style={{
                    backgroundColor: '#184F82',
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

                <span
                    onClick={this.props.onClose}
                    style={{
                        position: 'absolute',
                        right: 30,
                        display: 'inline-block',
                        cursor: 'pointer',
                    }}
                >
                    X
                </span>
            </div>
        );
    }
}

module.exports = PanelHeader;
