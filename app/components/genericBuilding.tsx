import React from 'react';
import withBuildingData from 'app/hocs/withBuildingData';

import BuildingInformation from 'app/components/building/information';
import RepairTab from 'app/components/building/repairTab';
import ProductionTab from 'app/components/building/productionTab';

import { Tabber } from 'app/components/tabber';

import { WindowOptions, Building } from 'app/interfaces';

type Props = {
  options: WindowOptions;
  building: Building;
};

class GenericBuilding extends React.Component<Props> {
  render() {
    return (
      <>
        <BuildingInformation options={this.props.options} />
        <Tabber
          tabs={[
            {
              title: 'Repair',
              shouldRender: this.props.building.efficiency !== 100 && !!this.props.building.id,
              component: () => <RepairTab building={this.props.building} />,
            },
            {
              title: 'Production',
              component: () => <ProductionTab building={this.props.building} />,
            },
          ]}
        />
      </>
    );
  }
}

export default withBuildingData(GenericBuilding);
