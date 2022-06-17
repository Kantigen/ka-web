import React from 'react';
import Icon from 'app/components/menu/icon';
import ProgressBar from 'app/components/menu/bottomBar/progressBar';
import { IconStyle } from 'app/interfaces/menu/icons';

type Props = {
  iconStyle: IconStyle;
  iconTitle?: string;
  topText: string;
  bottomText: string;
  progressPercent?: number;
  title?: string;
};

class BottomBarSection extends React.Component<Props> {
  render() {
    return (
      <div className='item'>
        {this.props.progressPercent ? <ProgressBar percent={this.props.progressPercent} /> : ''}

        {<Icon style={this.props.iconStyle} title={this.props.iconTitle} size='large' />}

        <span title={this.props.title}>
          <p style={{ margin: 0 }}>{this.props.topText}</p>
          {this.props.bottomText}
        </span>
      </div>
    );
  }
}

export default BottomBarSection;
