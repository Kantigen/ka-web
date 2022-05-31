import React from 'react';
import { MatrixBuilding } from 'app/interfaces/rearrangeBuildings';
import BuildingControls from './buildingControls';

type Props = {
  selectedBuilding: undefined | MatrixBuilding;
  onSubmit(): void;
  onMove(x: number, y: number): void;
};

class Sidebar extends React.Component<Props> {
  render() {
    return (
      <>
        {this.props.selectedBuilding ? (
          <BuildingControls
            building={this.props.selectedBuilding}
            onMove={(x, y) => this.props.onMove(x, y)}
          />
        ) : (
          <div className='block has-text-weight-bold'>Select a building to move</div>
        )}

        <button className='button is-success' onClick={() => this.props.onSubmit()}>
          Save
        </button>
      </>
    );
  }
}

export default Sidebar;
