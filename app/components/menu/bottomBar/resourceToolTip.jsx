import PropTypes from 'prop-types';

import React from 'react';
import classnames from 'classnames';

import * as util from 'app/util';

class ResourceToolTip extends React.Component {
  static propTypes = {
    body: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    children: PropTypes.node,
  };

  getResourceStatus = (hour, stored, capicity, hasCapicity) => {
    // Different players have differnet strategies regarding waste. Some would consider full
    // waste good. Some would consider empty waste good. Therefore, we shouldn't comment
    // on what a player does or does not do with their waste.
    if (this.props.type === 'waste') {
      return '';
    }

    if (stored === capicity) {
      return (
        <div>
          <i className='large green thumbs up icon' />
          Full
        </div>
      );
    }
    if (hour < 0 && stored > 0) {
      return (
        <div>
          <i className='large red warning circle icon' />
          Empty in {util.formatTime((-3600 * stored) / hour)}
        </div>
      );
    }
    if (hour > 0 && stored > 0 && hasCapicity) {
      return (
        <div>
          <i className='large wait icon' />
          Full in {util.formatTime((3600 * (capicity - stored)) / hour)}
        </div>
      );
    }
    if (hour > 0 && stored > 0 && !hasCapicity) {
      return (
        <div>
          <i className='large green thumbs up icon' />
          Going up
        </div>
      );
    }
    return (
      <div>
        <i className='large red warning circle icon' />
        <strong>Danger!</strong>
      </div>
    );
  };

  render() {
    const { body } = this.props;

    const hour = body[`${this.props.type}_hour`];
    const stored = body[`${this.props.type}_stored`] || body[this.props.type] || 0;
    const capicity = body[`${this.props.type}_capacity`];

    // Some resources (happiness) do not have a storage limit.
    const hasCapicity = typeof capicity !== 'undefined';

    return (
      <div
        style={{
          lineHeight: '2em',
        }}
      >
        <div
          style={{
            textAlign: 'center',
          }}
        >
          <strong>{this.props.title}</strong>
        </div>

        <div>
          <i className={classnames(this.props.icon, 'large icon')} />
          {util.commify(stored)} {hasCapicity ? ` / ${util.commify(capicity)}` : ''}
        </div>

        <div>
          <i className='at large icon' />
          {util.commify(hour)} / hr
        </div>

        {this.props.children}

        {this.getResourceStatus(hour, stored, capicity, hasCapicity)}
      </div>
    );
  }
}

export default ResourceToolTip;
