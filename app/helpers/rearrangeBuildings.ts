import { BuildingCoordinates } from 'app/interfaces/rearrangeBuildings';

class RearrangeBuildingsHelper {
  canMoveTile(building: BuildingCoordinates, xDelta: number, yDelta: number): boolean {
    const newX = building.x + xDelta;
    const newY = building.y + yDelta;
    return newX <= 5 && newX >= -5 && newY <= 5 && newY >= -5;
  }
}

export default new RearrangeBuildingsHelper();
