import React from 'react';
import { MatrixBuilding } from 'app/interfaces/rearrangeBuildings';

type Props = {
  building: MatrixBuilding;
};

class BuildingInfo extends React.Component<Props> {
  render() {
    return (
      <div className='block mb-6'>
        <div className='has-text-weight-bold mb-2'>
          {this.props.building.name || 'Empty Space'} ({this.props.building.x},{' '}
          {this.props.building.y})
        </div>

        <div>Level: {this.props.building.level}</div>
        <div>ID: {this.props.building.id}</div>
      </div>
    );
  }
}

export default BuildingInfo;
