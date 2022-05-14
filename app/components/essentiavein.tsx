import React from 'react';

import BuildingInformation from 'app/components/building/information';
import DrainTab from 'app/components/essentiavein/drainTab';
import RepairTab from 'app/components/building/repairTab';
import ProductionTab from 'app/components/building/productionTab';

import withBuildingData from 'app/hocs/withBuildingData';

import { Tabber } from 'app/components/tabber';
import { Building, BuildingWindowOptions } from 'app/interfaces';

type Props = {
  options: BuildingWindowOptions;
  building: Building;
};

class EssentiaVein extends React.Component<Props> {
  render() {
    return (
      <>
        <BuildingInformation options={this.props.options} />
        <Tabber
          tabs={[
            {
              title: 'Production',
              component: () => <ProductionTab building={this.props.building} />,
            },
            {
              title: 'Repair',
              component: () => <RepairTab building={this.props.building} />,
              shouldRender: this.props.building.efficiency !== 100 && !!this.props.building.id,
            },
            {
              title: 'Drain',
              component: () => <DrainTab building={this.props.building} />,
            },
          ]}
        />
      </>
    );
  }
}

export default withBuildingData(EssentiaVein);
