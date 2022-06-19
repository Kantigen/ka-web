import React from 'react';
import { CustomBuildingComponent, BuildingComponentProps } from 'app/interfaces';
import withBuildingData from 'app/hocs/withBuildingData';
import { Tabber } from 'app/components/tabber';
import { Tab } from 'app/interfaces/tabber';
import BuildingInformation from 'app/components/building/information';
import ProductionTab from 'app/components/building/productionTab';
import RepairTab from 'app/components/building/repairTab';

const withBuildingTabs = (customBuilding: CustomBuildingComponent) =>
  withBuildingData(
    class WithBuildingTabs extends React.Component<BuildingComponentProps> {
      render() {
        const tabs: Tab[] = [
          {
            title: 'Production',
            component: () => <ProductionTab building={this.props.building} />,
          },
          {
            title: 'Repair',
            shouldRender: this.props.building.efficiency !== 100 && !!this.props.building.id,
            component: () => <RepairTab building={this.props.building} />,
          },
          ...customBuilding.getTabs(this.props.building, this.props.options),
        ];

        return (
          <>
            <BuildingInformation options={this.props.options} />
            <Tabber tabs={tabs} />
          </>
        );
      }
    }
  );

export default withBuildingTabs;
