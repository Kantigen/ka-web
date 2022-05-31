import RearrangeBuildingsHelper from 'app/helpers/rearrangeBuildings';

test('it should constrain buildings to the 11x11 grid', () => {
  expect(RearrangeBuildingsHelper.canMoveTile({ x: 0, y: 0 }, 1, 0)).toBe(true);
  expect(RearrangeBuildingsHelper.canMoveTile({ x: 5, y: 0 }, 1, 0)).toBe(false);
  expect(RearrangeBuildingsHelper.canMoveTile({ x: -5, y: 0 }, -1, 0)).toBe(false);
  expect(RearrangeBuildingsHelper.canMoveTile({ x: 0, y: 5 }, 0, 1)).toBe(false);
  expect(RearrangeBuildingsHelper.canMoveTile({ x: 0, y: -5 }, 0, -1)).toBe(false);
});
