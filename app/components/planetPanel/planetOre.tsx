import React from 'react';
import PropTypes from 'prop-types';

import PlanetDetailLine from 'app/components/planetPanel/line';

import constants from 'app/constants';

type Props = {
  status: any;
};

class PlanetOre extends React.Component<Props> {
  static propTypes = {
    status: PropTypes.object.isRequired,
  };

  render() {
    const ores = constants.ORES;
    const bodyOre = this.props.status.ore;

    const renderOres = [];
    for (const prop in ores) {
      if (ores.hasOwnProperty(prop)) {
        renderOres.push(
          <PlanetDetailLine title={ores[prop]} value={bodyOre[prop]} key={ores[prop]} />
        );
      }
    }

    return (
      <div className='ui grid'>
        <div className='sixteen wide column'>{renderOres}</div>
      </div>
    );
  }
}

export default PlanetOre;
