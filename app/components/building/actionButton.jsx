import PropTypes from 'prop-types';

import React from 'react';
import classnames from 'classnames';

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
    const hasError = !!this.props.error;

    const elementAttributes = {
      className: classnames(
        'fluid ui button',
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

    return (
      <div {...elementAttributes}>
        <span>{this.props.actionName}</span>
      </div>
    );
  }
}

export default ActionButton;
