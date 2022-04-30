import PropTypes from 'prop-types';

import React from 'react';

import ResourceLine from 'app/components/building/resourceLine';

import * as util from 'app/util';

class ResourceCost extends React.Component {
  static propTypes = {
    icon: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
    stored: PropTypes.number,
  };

  render() {
    let red = false;

    if (typeof this.props.stored === 'number' && this.props.number > this.props.stored) {
      red = true;
    }

    return (
      <ResourceLine
        icon={this.props.icon}
        content={util.reduceNumber(this.props.number)}
        title={util.commify(this.props.number)}
        red={red}
      />
    );
  }
}

export default ResourceCost;
