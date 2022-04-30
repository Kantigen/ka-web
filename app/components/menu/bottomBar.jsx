import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import { observer } from 'mobx-react';

import BodyRPCStore from 'app/stores/rpc/body';
import ServerRPCStore from 'app/stores/rpc/server';
import EmpireRPCStore from 'app/stores/rpc/empire';

import BottomBarSection from 'app/components/menu/bottomBar/bottomBarSection';

import BuildingCountToolTip from 'app/components/menu/bottomBar/buildingCountToolTip';
import BuildQueueToolTip from 'app/components/menu/bottomBar/buildQueueToolTip';
import ResourceToolTip from 'app/components/menu/bottomBar/resourceToolTip';
import RPCCountToolTip from 'app/components/menu/bottomBar/rpcCountToolTip';

import * as util from 'app/util';

const rn = util.reduceNumber;

class BottomBar extends React.Component {
  constructor(props) {
    super(props);
    this.bottomBar = React.createRef();
    this.foodSection = React.createRef();
    this.oreSection = React.createRef();
    this.waterSection = React.createRef();
    this.energySection = React.createRef();
    this.wasteSection = React.createRef();
    this.happinessSection = React.createRef();
    this.buildingCountSection = React.createRef();
    this.buildQueueSection = React.createRef();
    this.rpcCountSection = React.createRef();
  }

  componentWillUnmount() {
    // Destroy!
    $('div', this.bottomBar).popup('destroy');
  }

  showFoodToolTip() {
    $(ReactDOM.findDOMNode(this.foodSection.current)).popup({
      position: 'top center',
      html: ReactDOMServer.renderToStaticMarkup(
        <ResourceToolTip body={BodyRPCStore} icon='food' type='food' title='Food' />
      ),
    });
  }

  showOreToolTip() {
    $(ReactDOM.findDOMNode(this.oreSection.current)).popup({
      position: 'top center',
      html: ReactDOMServer.renderToStaticMarkup(
        <ResourceToolTip body={BodyRPCStore} icon='diamond' type='ore' title='Ore' />
      ),
    });
  }

  showWaterToolTip() {
    $(ReactDOM.findDOMNode(this.waterSection.current)).popup({
      position: 'top center',
      html: ReactDOMServer.renderToStaticMarkup(
        <ResourceToolTip body={BodyRPCStore} icon='theme' type='water' title='Water' />
      ),
    });
  }

  showEnergyToolTip() {
    $(ReactDOM.findDOMNode(this.energySection.current)).popup({
      position: 'top center',
      html: ReactDOMServer.renderToStaticMarkup(
        <ResourceToolTip body={BodyRPCStore} icon='lightning' type='energy' title='Energy' />
      ),
    });
  }

  showWasteToolTip() {
    $(ReactDOM.findDOMNode(this.wasteSection.current)).popup({
      position: 'top center',
      html: ReactDOMServer.renderToStaticMarkup(
        <ResourceToolTip body={BodyRPCStore} icon='trash' type='waste' title='Waste' />
      ),
    });
  }

  showHappinessToolTip() {
    $(ReactDOM.findDOMNode(this.happinessSection.current)).popup({
      position: 'top center',
      html: ReactDOMServer.renderToStaticMarkup(
        <ResourceToolTip body={BodyRPCStore} icon='smile' type='happiness' title='Happiness'>
          <div>
            <i className='large spy icon' />
            {BodyRPCStore.propaganda_boost}
          </div>
        </ResourceToolTip>
      ),
    });
  }

  showBuildingCountToolTip() {
    $(ReactDOM.findDOMNode(this.buildingCountSection.current)).popup({
      html: ReactDOMServer.renderToStaticMarkup(<BuildingCountToolTip />),
      hoverable: true,
      position: 'top center',
      delay: {
        hide: 800,
      },
    });
  }

  showBuildQueueToolTip() {
    const body = BodyRPCStore;

    $(ReactDOM.findDOMNode(this.buildQueueSection.current)).popup({
      html: ReactDOMServer.renderToStaticMarkup(<BuildQueueToolTip body={body} />),
      hoverable: true,
      position: 'top center',
      delay: {
        hide: 800,
      },
    });
  }

  showRPCCountToolTip() {
    $(ReactDOM.findDOMNode(this.rpcCountSection.current)).popup({
      html: ReactDOMServer.renderToStaticMarkup(<RPCCountToolTip />),
      hoverable: true,
      position: 'top center',
      delay: {
        hide: 800,
      },
    });
  }

  render() {
    return (
      <div
        className='ui centered grid'
        style={{
          zIndex: 2000,
          position: 'relative',
          top: 'calc(100vh - 175px)',
        }}
      >
        <div className='center aligned column'>
          <div className='ui blue inverted compact labeled icon menu small' ref={this.bottomBar}>
            <BottomBarSection
              ref={this.foodSection}
              progressPercent={BodyRPCStore.food_percent_full}
              iconName='food'
              topText={`${rn(BodyRPCStore.food_stored)} / ${rn(BodyRPCStore.food_capacity)}`}
              bottomText={`${rn(BodyRPCStore.food_hour)} / hr`}
              toolTipShow={() => this.showFoodToolTip()}
            />

            <BottomBarSection
              ref={this.oreSection}
              progressPercent={BodyRPCStore.ore_percent_full}
              iconName='diamond'
              topText={`${rn(BodyRPCStore.ore_stored)} / ${rn(BodyRPCStore.ore_capacity)}`}
              bottomText={`${rn(BodyRPCStore.ore_hour)} / hr`}
              toolTipShow={() => this.showOreToolTip()}
            />

            <BottomBarSection
              ref={this.waterSection}
              progressPercent={BodyRPCStore.water_percent_full}
              iconName='theme'
              topText={`${rn(BodyRPCStore.water_stored)} / ${rn(BodyRPCStore.water_capacity)}`}
              bottomText={`${rn(BodyRPCStore.water_hour)} / hr`}
              toolTipShow={() => this.showWaterToolTip()}
            />

            <BottomBarSection
              ref={this.energySection}
              progressPercent={BodyRPCStore.energy_percent_full}
              iconName='lightning'
              topText={`${rn(BodyRPCStore.energy_stored)} / ${rn(BodyRPCStore.energy_capacity)}`}
              bottomText={`${rn(BodyRPCStore.energy_hour)} / hr`}
              toolTipShow={() => this.showEnergyToolTip()}
            />

            {BodyRPCStore.type !== 'space station' ? (
              <BottomBarSection
                ref={this.wasteSection}
                progressPercent={BodyRPCStore.waste_percent_full}
                iconName='trash'
                topText={`${rn(BodyRPCStore.waste_stored)} / ${rn(BodyRPCStore.waste_capacity)}`}
                bottomText={`${rn(BodyRPCStore.waste_hour)} / hr`}
                toolTipShow={() => this.showWasteToolTip()}
              />
            ) : (
              ''
            )}

            {BodyRPCStore.type !== 'space station' ? (
              <BottomBarSection
                ref={this.happinessSection}
                iconName='smile'
                topText={rn(BodyRPCStore.happiness)}
                bottomText={`${rn(BodyRPCStore.happiness_hour)} / hr`}
                toolTipShow={() => this.showHappinessToolTip()}
              />
            ) : (
              ''
            )}

            <BottomBarSection
              ref={this.buildingCountSection}
              iconName='block layout'
              topText={`${BodyRPCStore.building_count} / ${
                BodyRPCStore.building_count + BodyRPCStore.plots_available
              }`}
              bottomText={`${BodyRPCStore.plots_available} Available`}
              toolTipShow={() => this.showBuildingCountToolTip()}
            />

            <BottomBarSection
              ref={this.buildQueueSection}
              iconName='list'
              topText={
                BodyRPCStore.build_queue_len +
                (BodyRPCStore.type !== 'space station' ? ` / ${BodyRPCStore.build_queue_size}` : '')
              }
              bottomText='Build Q'
              toolTipShow={() => this.showBuildQueueToolTip()}
            />

            <BottomBarSection
              ref={this.rpcCountSection}
              iconName='exchange'
              topText={`${EmpireRPCStore.rpc_count} / ${rn(ServerRPCStore.rpc_limit)}`}
              bottomText='Actions'
              toolTipShow={() => this.showRPCCountToolTip()}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default observer(BottomBar);
