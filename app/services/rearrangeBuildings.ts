import Body from 'app/client/body';
import _ from 'lodash';
import { Matrix } from 'app/interfaces/rearrangeBuildings';
import { int } from 'app/util';
import {
  BodyGetBuildingsResponse,
  BodyRearrangeBuildingsParams,
  BodyRearrangeBuildingsResponse,
} from 'app/interfaces';

class RearrangeBuildingsService {
  async fetchBuildingsMatrix(bodyId: number): Promise<Matrix> {
    const res = await Body.getBuildings(bodyId);
    return this.buildingsToMatrix(res.buildings);
  }

  buildingsToMatrix(buildings: BodyGetBuildingsResponse['buildings']): Matrix {
    let matrix: Matrix = [];

    _.each(buildings, (building, id) => {
      matrix[building.x] = matrix[building.x] || [];
      matrix[building.x][building.y] = { id: int(id), ...building };
    });

    return matrix;
  }

  rearrangeBuildingsFromMatrix(
    bodyId: number,
    matrix: Matrix
  ): Promise<BodyRearrangeBuildingsResponse> {
    const params: BodyRearrangeBuildingsParams = [bodyId, this.matrixToRearrangeCall(matrix)];
    return Body.rearrangeBuildings(params);
  }

  matrixToRearrangeCall(matrix: Matrix): BodyRearrangeBuildingsParams['1'] {
    const buildings: BodyRearrangeBuildingsParams['1'] = [];

    _.each(_.flatten(matrix), (b) => {
      if (
        typeof b?.x !== 'undefined' &&
        typeof b?.y !== 'undefined' &&
        typeof b?.id !== 'undefined'
      ) {
        buildings.push({ x: b.x, y: b.y, id: b.id });
      }
    });

    return buildings;
  }
}

export default new RearrangeBuildingsService();
