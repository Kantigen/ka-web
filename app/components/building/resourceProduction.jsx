import PropTypes from 'prop-types';

import React from 'react';

import ResourceLine from 'app/components/building/resourceLine';

import * as util from 'app/util';

class ResourceProduction extends React.Component {
  static propTypes = {
    icon: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
  };

  render() {
    return (
      <ResourceLine
        icon={this.props.icon}
        content={`${util.reduceNumber(this.props.number)} / hr`}
        title={util.commify(this.props.number)}
      />
    );
  }
}

export default ResourceProduction;
