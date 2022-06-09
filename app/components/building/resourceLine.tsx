import React from 'react';
import { IconStyle } from 'app/interfaces/menu/icons';
import Icon from 'app/components/menu/icon';
import classNames from 'classnames';

type Props = {
  icon: IconStyle;
  title: string;
  red?: boolean;
  content: string;
};

class ResourceLine extends React.Component<Props> {
  render() {
    return (
      <div className='columns is-gapless is-vcentered m-0'>
        <div className='column'>
          <Icon style={this.props.icon} />
        </div>

        <div className={classNames('column is-narrow', { 'has-text-danger': !!this.props.red })}>
          <span title={this.props.title}>{this.props.content}</span>
        </div>
      </div>
    );
  }
}

export default ResourceLine;
