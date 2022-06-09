import PropTypes from 'prop-types';

import React from 'react';
import Icon from 'app/components/menu/icon';
import ProgressBar from 'app/components/menu/bottomBar/progressBar';

class BottomBarSection extends React.Component {
  static propTypes = {
    iconName: PropTypes.string.isRequired,
    topText: PropTypes.string.isRequired,
    bottomText: PropTypes.string.isRequired,
    toolTipShow: PropTypes.func,
    progressPercent: PropTypes.number,
  };

  handleToolTip = () => {
    if (typeof this.props.toolTipShow === 'function') {
      this.props.toolTipShow();
    }
  };

  render() {
    return (
      <div className='item' onMouseEnter={this.handleToolTip}>
        {this.props.progressPercent ? <ProgressBar percent={this.props.progressPercent} /> : ''}

        {<Icon style={this.props.iconName} size='large' />}

        <p
          style={{
            margin: 0,
          }}
        >
          {this.props.topText}
        </p>

        {this.props.bottomText}
      </div>
    );
  }
}

export default BottomBarSection;
