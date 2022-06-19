import withBuildingTabs from 'app/hocs/withBuildingTabs';

const GenericBuilding = {
  getTabs() {
    return [];
  },
};

export default withBuildingTabs(GenericBuilding);
