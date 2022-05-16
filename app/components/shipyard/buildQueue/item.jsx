import PropTypes from 'prop-types';

import React from 'react';

import ResourceAttribute from 'app/components/shipyard/resourceAttribute';
import SubsidizeButton from 'app/components/shipyard/buildQueue/subsidizeButton';
import CountdownTimer from 'app/components/countdownTimer';

import * as util from 'app/util';
import constants from 'app/constants';

class BuildQueueItem extends React.Component {
  static propTypes = {
    obj: PropTypes.object.isRequired,
    buildingId: PropTypes.number.isRequired,
  };

  render() {
    const starfieldStyle = {
      width: 100,
      height: 100,
      background: `transparent url(${environment.getAssetsUrl()}star_system/field.png) no-repeat center`,
    };

    const { obj } = this.props;
    const shipImage = `${environment.getAssetsUrl()}ships/${this.props.obj.type}.png`;

    return (
      <div>
        <div className='ui grid'>
          <div className='three wide column'>
            <div>{obj.type_human}</div>
            <div style={starfieldStyle}>
              <img
                src={shipImage}
                style={{
                  width: 100,
                  height: 100,
                }}
                className='shipImage'
              />
            </div>
          </div>

          <div className='four wide column'>
            <ResourceAttribute name='Quantity' attr={obj.quantity} />
            <ResourceAttribute name='Speed' attr={obj.attributes.speed} />
            <ResourceAttribute name='Berth Level' attr={obj.attributes.berth_level} />
            <ResourceAttribute name='Hold Size' attr={obj.attributes.hold_size} />
            <ResourceAttribute name='Max Occupants' attr={obj.attributes.max_occupants} />
            <ResourceAttribute name='Combat' attr={obj.attributes.combat} />
            <ResourceAttribute name='Stealth' attr={obj.attributes.stealth} />
          </div>

          <div className='four wide column'>
            <CountdownTimer
              endDate={util.formatMomentLong(util.serverDateToMoment(obj.date_completed))}
            />
          </div>

          <div className='five wide column'>
            <SubsidizeButton obj={obj} buildingId={this.props.buildingId} />
          </div>
        </div>

        <div className='ui divider' />
      </div>
    );
  }
}

export default BuildQueueItem;
