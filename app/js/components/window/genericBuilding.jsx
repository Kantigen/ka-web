'use strict';

var React = require('react');
var PropTypes = require('prop-types');
var { observer } = require('mobx-react');

var BuildingInformation = require('app/js/components/window/building/information');
var RepairTab = require('app/js/components/window/building/repairTab');
var ProductionTab = require('app/js/components/window/building/productionTab');

var { Tabs, Tab } = require('app/js/components/tabber');
var GenericBuildingRPCStore = require('app/js/stores/rpc/genericBuilding');
var GenericBuildingService = require('app/js/services/genericBuilding');

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

module.exports = observer(GenericBuilding);
