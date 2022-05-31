import RearrangeBuildingsService from 'app/services/rearrangeBuildings';

test('buildingsToMatrix', () => {
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
