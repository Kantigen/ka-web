import React from 'react';
import environment from 'app/environment';
import BuildingTile from 'app/components/rearrangeBuildings/buildingTile';
import BodyRPCStore from 'app/stores/rpc/body';
import { Matrix, BuildingCoordinates, SelectedBuilding } from 'app/interfaces/rearrangeBuildings';

type Props = {
  matrix: Matrix;
  selected: SelectedBuilding;
  tileClick(arg0: BuildingCoordinates): void;
};

class Planet extends React.Component<Props> {
  render() {
    const planet = [];

    for (let y = 5; y >= -5; y--) {
      for (let x = -5; x <= 5; x++) {
        planet.push(
          <BuildingTile
            matrix={this.props.matrix}
            x={x}
            y={y}
            selected={this.props.selected?.x === x && this.props.selected?.y === y}
            onClick={() => this.props.tileClick({ x, y })}
            key={`${x}:${y}`}
          />
        );
      }
    }

    return (
      <div
        style={{
          position: 'relative',
          background: `url(${`${environment.getAssetsUrl()}planet_side/surface-${
            BodyRPCStore.surfaceImage
          }.jpg`})`,
          width: 550,
          height: 550,
        }}
      >
        {planet}
      </div>
    );
  }
}

export default Planet;
