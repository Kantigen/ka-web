import React from 'react';
import classnames from 'classnames';

type Props = {
  actionName: string;
  color: 'blue' | 'green' | 'red';
  error?: string;
  onClick: Function;
};

class ActionButton extends React.Component<Props> {
  handleClick() {
    if (!this.props.error) {
      this.props.onClick();
    }
  }

  render() {
    return (
      <button
        className={classnames('button is-fullwidth', {
          'is-danger': this.props.color === 'red',
          'is-primary': this.props.color === 'blue',
          'is-success': this.props.color === 'green',
        })}
        onClick={() => this.handleClick()}
        disabled={!!this.props.error}
        title={this.props.error}
      >
        {this.props.actionName}
      </button>
    );
  }
}

export default ActionButton;
