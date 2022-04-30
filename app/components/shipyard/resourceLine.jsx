import PropTypes from 'prop-types';

import React from 'react';
import classnames from 'classnames';

import * as util from 'app/util';

class ResourceLine extends React.Component {
  static propTypes = {
    icon: PropTypes.string.isRequired,
    cost: PropTypes.number.isRequired,
    red: PropTypes.bool,
  };

  render() {
    let iconClass = classnames(this.props.icon, 'large icon', {
      red: this.props.red,
    });
    let content = util.reduceNumber(this.props.cost);
    let title = util.commify(this.props.cost);

    return (
      <div
        style={{
          marginTop: 5,
        }}
      >
        <i className={iconClass}></i>
        <span
          style={{
            float: 'right',
            color: this.props.red ? 'red' : 'white',
          }}
          title={title}
        >
          {content}
        </span>
      </div>
    );
  }
}

export default ResourceLine;
