import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import BuildingInformation from 'app/js/components/window/building/information';
import RepairTab from 'app/js/components/window/building/repairTab';
import ProductionTab from 'app/js/components/window/building/productionTab';

import { Tabs, Tab } from 'app/js/components/tabber';
import GenericBuildingRPCStore from 'app/js/stores/rpc/genericBuilding';
import GenericBuildingService from 'app/js/services/genericBuilding';

class GenericBuilding extends React.Component {
    static options = {
        title: 'Building',
        width: 700,
        height: 'auto',
    };

    static propTypes = {
        options: PropTypes.object,
    };

    componentWillMount() {
        GenericBuildingService.view(this.props.options.url, this.props.options.id);
    }

    componentDidUpdate(prevProps) {
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
                            undefined
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
