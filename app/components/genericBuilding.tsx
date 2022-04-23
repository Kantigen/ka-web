import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import BuildingInformation from 'app/components/building/information';
import RepairTab from 'app/components/building/repairTab';
import ProductionTab from 'app/components/building/productionTab';

import { Tabs, Tab } from 'app/components/tabber';
import GenericBuildingRPCStore from 'app/stores/rpc/genericBuilding';
import GenericBuildingService from 'app/services/genericBuilding';

import { WindowOptions } from 'app/interfaces';

type Props = {
    options: WindowOptions;
};

class GenericBuilding extends React.Component<Props> {
    static propTypes = {
        options: PropTypes.object,
    };

    componentWillMount() {
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

    closeWindow() {
        WindowsStore.close('genericBuilding');
    }

    render() {
        return (
            <div>
                <BuildingInformation options={this.props.options} />
                <div>
                    <Tabs>
                        {GenericBuildingRPCStore.efficiency !== 100 &&
                        GenericBuildingRPCStore.id ? (
                            <Tab title='Repair' key='Repair'>
                                <RepairTab />
                            </Tab>
                        ) : (
                            <></>
                        )}

                        <Tab title='Production' key='Production'>
                            <ProductionTab />
                        </Tab>
                    </Tabs>
                </div>
            </div>
        );
    }
}

export default observer(GenericBuilding);
