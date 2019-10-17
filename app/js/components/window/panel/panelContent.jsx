'use strict';

var PropTypes = require('prop-types');

var React = require('react');

class PanelContent extends React.Component {
    static propTypes = {
        panelHeight: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
        ]),
        panelWidth: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
        ]),
        children: PropTypes.element,
    };

    render() {
        return (
            <div
                style={{
                    overflow: 'auto',
                    width: this.props.panelWidth,
                    border: '2px solid black',
                    backgroundColor: '#0268AC',
                    borderRadius: '10px',
                    padding: '10px',
                }}
            >
                <div
                    style={{
                        overflow: 'auto',
                        overflowX: 'hidden',
                        height: this.props.panelHeight,
                        padding: '5px',
                        boxSizing: 'border-box',
                    }}
                >
                    {this.props.children}
                </div>
            </div>
        );
    }
}

module.exports = PanelContent;
