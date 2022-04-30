import PropTypes from 'prop-types';

import React from 'react';

import ResourceAttribute from 'app/components/shipyard/resourceAttribute';

import constants from 'app/constants';

class BuildFleetItem extends React.Component {
  static propTypes = {
    obj: PropTypes.object.isRequired,
    buildingId: PropTypes.number.isRequired,
  };

  render() {
    let starfieldStyle = {
      width: 100,
      height: 100,
      background:
        'transparent url(' + constants.ASSETS_URL + 'star_system/field.png) no-repeat center',
    };

    let obj = this.props.obj;
    let shipImage = constants.ASSETS_URL + 'ships/' + obj.details.type + '.png';

    return (
      <div>
        <div className='ui grid'>
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

          <div className='four wide column'>
            <ResourceAttribute name={'Quantity'} attr={obj.quantity} />
            <ResourceAttribute name={'Speed'} attr={obj.details.speed} />
            <ResourceAttribute name={'Berth Level'} attr={obj.details.berth_level} />
            <ResourceAttribute name={'Hold Size'} attr={obj.details.hold_size} />
            <ResourceAttribute name={'Max Occupants'} attr={obj.details.max_occupants} />
            <ResourceAttribute name={'Combat'} attr={obj.details.combat} />
            <ResourceAttribute name={'Stealth'} attr={obj.details.stealth} />
            <ResourceAttribute name={'Name'} attr={obj.details.name} />
            <ResourceAttribute name={'Type'} attr={obj.details.type} />
            <ResourceAttribute name={'Marque'} attr={obj.details.mark} />
          </div>

          <div className='four wide column'>buttons</div>
        </div>

        <div className='ui divider' />
      </div>
    );
  }
}

export default BuildFleetItem;
