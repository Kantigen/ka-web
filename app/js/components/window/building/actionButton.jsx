'use strict';

var PropTypes = require('prop-types');

var React = require('react');
var classnames = require('classnames');

class ActionButton extends React.Component {
    static propTypes = {
        actionName: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
        error: PropTypes.string,
        onClick: PropTypes.func.isRequired,
    };

    handleClick = () => {
        if (!this.props.error) {
            this.props.onClick();
        }
    };

    render() {
        var hasError = !!this.props.error;

        var elementAttributes = {
            className: classnames(
                'ui button',
                {
                    disabled: hasError,
                },
                this.props.color
            ),
            onClick: this.handleClick,
        };

        if (hasError) {
            elementAttributes['data-tip'] = this.props.error;
            elementAttributes['data-place'] = 'top';
            elementAttributes['data-type'] = 'error';
        }

        return React.createElement(
            'div',
            elementAttributes,
            <span>{this.props.actionName}</span>
        );
    }
}

module.exports = ActionButton;
