import React from 'react';
import Planet from 'app/components/rearrangeBuildings/planet';
import Sidebar from 'app/components/rearrangeBuildings/sidebar';
import _ from 'lodash';
import { Building } from 'app/interfaces';
import BodyRPCStore from 'app/stores/rpc/body';
import { Matrix, BuildingCoordinates, SelectedBuilding } from 'app/interfaces/rearrangeBuildings';
import * as vex from 'app/vex';
import WindowsStore from 'app/stores/windows';
import RearrangeBuildingsService from 'app/services/rearrangeBuildings';
import RearrangeBuildingsHelper from 'app/helpers/rearrangeBuildings';
import { pluralize } from 'app/util';
import LegacyHooks from 'app/legacyHooks';

declare const YAHOO: any;

type State = {
  matrix: Matrix;
  selected: SelectedBuilding;
};

class RearrangeBuildings extends React.Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      matrix: [],
      selected: undefined,
    };
  }

  async componentDidMount(): Promise<void> {
    const matrix = await RearrangeBuildingsService.fetchBuildingsMatrix(BodyRPCStore.id);
    this.setState({ matrix });
  }

  async rearrangePlanet(): Promise<void> {
    const res = await RearrangeBuildingsService.rearrangeBuildingsFromMatrix(
      BodyRPCStore.id,
      this.state.matrix
    );
    const moved = res.moved.length;

    vex.alert(
      `Successfully rearranged ${moved} ${pluralize(moved, 'building', 'buildings')}`,
      () => {
        WindowsStore.close('rearrangeBuildings');
      }
    );

    LegacyHooks.refreshPlanet();
  }

  tileClick(selected: BuildingCoordinates): void {
    if (this.state.selected?.x === selected.x && this.state.selected?.y === selected.y) {
      this.deselectCurrentTile();
    } else {
      this.setState({ selected });
    }
  }

  deselectCurrentTile(): void {
    this.setState({ selected: undefined });
  }

  moveCurrentTile(xDelta: number, yDelta: number): void {
    const building = this.state.selected;

    if (!building) return;
    if (!RearrangeBuildingsHelper.canMoveTile(building, xDelta, yDelta)) return;

    const { x, y } = building;
    const newX = x + xDelta;
    const newY = y + yDelta;

    const a = this.state.matrix[x][y];
    const b = this.state.matrix[newX][newY];

    if (a) {
      a.x = newX;
      a.y = newY;
    }

    if (b) {
      b.x = x;
      b.y = y;
    }

    const matrix = { ...this.state.matrix };
    matrix[newX][newY] = a;
    matrix[x][y] = b;

    this.setState({ matrix, selected: { x: newX, y: newY } });
  }

  render() {
    const selectedBuilding = this.state.selected
      ? this.state.matrix[this.state.selected.x][this.state.selected.y]
      : undefined;

    return (
      <div className='bulma'>
        <div className='columns'>
          <div className='column'>
            <Planet
              matrix={this.state.matrix}
              selected={this.state.selected}
              tileClick={(coords) => {
                this.tileClick(coords);
              }}
            />
          </div>
          <div className='column'>
            <Sidebar
              selectedBuilding={selectedBuilding}
              onSubmit={() => this.rearrangePlanet()}
              onMove={(x, y) => this.moveCurrentTile(x, y)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default RearrangeBuildings;
