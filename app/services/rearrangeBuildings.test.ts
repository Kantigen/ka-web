import RearrangeBuildingsService from 'app/services/rearrangeBuildings';
import { Matrix } from 'app/interfaces/rearrangeBuildings';
import { BodyGetBuildingsResponse, BodyRearrangeBuildingsParams } from 'app/interfaces';
import { int } from 'app/util';

test('buildingsToMatrix', () => {
  const buildings: BodyGetBuildingsResponse['buildings'] = {};
  const matrix: Matrix = [];

  for (let x = -5; x < 5; x++) {
    for (let y = -5; y < 5; y++) {
      const id = `${x + 100}${y + 100}`;
      buildings[id] = {
        efficiency: 100,
        image: 'pcc5',
        level: 5,
        name: 'Planetary Command Center',
        url: '/pcc',
        x,
        y,
      };

      matrix[x] = matrix[x] || [];
      matrix[x][y] = {
        x,
        y,
        id: int(id),
        efficiency: 100,
        image: 'pcc5',
        level: 5,
        name: 'Planetary Command Center',
        url: '/pcc',
      };
    }
  }

  expect(RearrangeBuildingsService.buildingsToMatrix(buildings)).toMatchObject(matrix);

  expect(
    RearrangeBuildingsService.buildingsToMatrix({
      111111: {
        efficiency: 100,
        image: 'pcc5',
        level: 5,
        name: 'Planetary Command Center',
        url: '/pcc',
        x: 0,
        y: 0,
      },
    })
  ).toMatchObject([
    [
      {
        id: 111111,
        efficiency: 100,
        image: 'pcc5',
        level: 5,
        name: 'Planetary Command Center',
        url: '/pcc',
        x: 0,
        y: 0,
      },
    ],
  ]);
});

test('matrixToRearrangeCall', () => {
  const buildings: BodyRearrangeBuildingsParams['1'] = [];
  const matrix: Matrix = [];

  for (let x = -5; x < 5; x++) {
    for (let y = -5; y < 5; y++) {
      const id = int(`${x + 100}${y + 100}`);
      buildings.push({ id, x, y });

      matrix[x] = matrix[x] || [];
      matrix[x][y] = {
        x,
        y,
        id,
        efficiency: 100,
        image: 'pcc5',
        level: 5,
        name: 'Planetary Command Center',
        url: '/pcc',
      };
    }
  }

  expect(RearrangeBuildingsService.matrixToRearrangeCall(matrix)).toMatchObject(buildings);

  expect(
    RearrangeBuildingsService.matrixToRearrangeCall([
      [
        {
          id: 111111,
          efficiency: 100,
          image: 'pcc5',
          level: 5,
          name: 'Planetary Command Center',
          url: '/pcc',
          x: 0,
          y: 0,
        },
      ],
    ])
  ).toMatchObject([
    {
      id: 111111,
      x: 0,
      y: 0,
    },
  ]);
});
