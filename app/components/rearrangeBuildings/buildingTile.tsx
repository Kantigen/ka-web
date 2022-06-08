import React from 'react';
import environment from 'app/environment';
import { Matrix } from 'app/interfaces/rearrangeBuildings';

type Props = {
  matrix: Matrix;
  x: number;
  y: number;
  selected: boolean;
  onClick: Function;
};

class BuildingTile extends React.Component<Props> {
  render() {
    const building = this.props.matrix[this.props.x]
      ? this.props.matrix[this.props.x][this.props.y]
      : undefined;

    const imageUrl = `${environment.getAssetsUrl()}planet_side/50/${building?.image}.png`;

    return (
      <div
        onClick={() => this.props.onClick()}
        style={{
          position: 'absolute',
          top: (this.props.y - 5) * -50,
          left: (this.props.x + 5) * 50,
          width: 50,
          height: 50,
          ...(building ? { background: `url(${imageUrl}) center center no-repeat` } : {}),
          ...(this.props.selected ? { border: '1px dashed #fff' } : {}),
        }}
      />
    );
  }
}

export default BuildingTile;
