import React from 'react';
import { Fleet } from 'app/interfaces/spacePort';

import ResourceAttribute from 'app/components/shipyard/resourceAttribute';

import environment from 'app/environment';
import CountdownTimer from '../countdownTimer';

type Props = {
  fleet: Fleet;
  children: React.ReactElement,
};

class FleetItem extends React.Component<Props> {
  render() {

    const obj = this.props.fleet;
    const shipImage = `${environment.getAssetsUrl()}ships/${obj.details.type}.png`;

    return (
      <div>
        <div className='ui grid'>
          <div className='two wide column' style={{
              width: 100,
              height: 100,
              background: `transparent url(${environment.getAssetsUrl()}star_system/field.png) no-repeat center`,
            }}>
            <img
              src={shipImage}
              style={{
                width: 100,
                height: 100,
              }}
              className='shipImage'
            />
          </div>

          <div className='five wide column'>
            <ResourceAttribute name='Quantity' attr={obj.quantity} />
            <ResourceAttribute name='Task' attr={obj.task} />
            {obj.task === 'Travelling' ? (
              <>
                <ResourceAttribute name='To' attr={`${obj.to.name} (${obj.to.x},${obj.to.y})`} />
                <div>Arriving <CountdownTimer endDate={obj.date_arrives} /></div>
              </>
            ) : (
              ''
            )}
            <ResourceAttribute name='Speed' attr={obj.details.speed} />
            <ResourceAttribute name='Berth Level' attr={obj.details.berth_level} />
            <ResourceAttribute name='Hold Size' attr={obj.details.hold_size} />
            <ResourceAttribute name='Max Occupants' attr={obj.details.max_occupants} />
            <ResourceAttribute name='Combat' attr={obj.details.combat} />
            <ResourceAttribute name='Stealth' attr={obj.details.stealth} />
            <ResourceAttribute name='Name' attr={obj.details.name} />
            <ResourceAttribute name='Type' attr={obj.details.type_human} />
            <ResourceAttribute name='Marque' attr={obj.details.mark} />
          </div>

          <div className='five wide column'>{this.props.children}</div>
        </div>

        <div className='ui divider' />
      </div>
    );
  }
}

export default FleetItem;
