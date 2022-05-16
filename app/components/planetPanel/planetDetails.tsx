import React from 'react';
import PropTypes from 'prop-types';

import PlanetPanelLine from 'app/components/planetPanel/line';

import environment from 'app/environment';

type Props = {
  status: any;
};

class PlanetDetails extends React.Component<Props> {
  static propTypes = {
    status: PropTypes.object.isRequired,
  };

  render() {
    const bodyStatus = this.props.status;
    const location = `${bodyStatus.x}x : ${bodyStatus.y}y`;

    return (
      <div className='ui grid'>
        <div className='five wide column'>
          <img
            src={`${environment.getAssetsUrl()}star_system/${bodyStatus.image}-${
              bodyStatus.orbit
            }.png`}
            style={{
              width: 100,
              height: 100,
            }}
          />
        </div>
        <div className='eleven wide column'>
          <PlanetPanelLine title='Name' value={bodyStatus.name} />
          <PlanetPanelLine title='Type' value={bodyStatus.type} />
          <PlanetPanelLine title='Empire' value='' />
          <PlanetPanelLine title='Water' value={bodyStatus.water} />
          <PlanetPanelLine title='Planet Size' value={bodyStatus.size} />
          <PlanetPanelLine title='Location' value={location} />
          <PlanetPanelLine title='Zone' value={bodyStatus.zone} />
          <PlanetPanelLine title='Body ID' value={bodyStatus.id} />
          <PlanetPanelLine
            title='Star'
            value={`${bodyStatus.star_name}(ID: ${bodyStatus.star_id})`}
          />
          <PlanetPanelLine title='Orbit' value={bodyStatus.orbit} />
        </div>
      </div>
    );
  }
}

export default PlanetDetails;
