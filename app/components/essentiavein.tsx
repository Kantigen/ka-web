import PropTypes from 'prop-types';

import React from 'react';

import BuildingInformation from 'app/components/building/information';
import DrainTab from 'app/components/essentiavein/drainTab';
import RepairTab from 'app/components/building/repairTab';
import ProductionTab from 'app/components/building/productionTab';
import GenericBuildingService from 'app/services/genericBuilding';
import GenericBuildingRPCStore from 'app/stores/rpc/genericBuilding';

import { Tabs, Tab } from 'app/components/tabber';
import { WindowOptions } from 'app/interfaces';

type Props = {
  options: WindowOptions;
};

class EssentiaVein extends React.Component<Props> {
  componentDidMount() {
    GenericBuildingService.view(this.props.options.url, this.props.options.id);
  }

  componentDidUpdate(prevProps: Props) {
    if (
      prevProps.options.url != this.props.options.url ||
      prevProps.options.id != this.props.options.id
    ) {
      GenericBuildingService.view(this.props.options.url, this.props.options.id);
    }
  }

  render() {
    const building = {};
    return (
      <div>
        <BuildingInformation options={this.props.options} />
        <div>
          <Tabs>
            {GenericBuildingRPCStore.efficiency !== 100 && GenericBuildingRPCStore.id ? (
              <Tab title='Repair' key='Repair'>
                <RepairTab />
              </Tab>
            ) : (
              <></>
            )}

            <Tab title='Production' key='Production'>
              <ProductionTab />
            </Tab>

            <Tab title='Drain' key='Drain'>
              <DrainTab building={building} />
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default EssentiaVein;
