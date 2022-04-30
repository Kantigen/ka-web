import PropTypes from 'prop-types';

import React from 'react';
import createReactClass from 'create-react-class';
import _ from 'lodash';

import GetBuildableShipyardRPCStore from 'app/stores/rpc/shipyard/getBuildable';

import BuildFleetItem from 'app/components/shipyard/buildFleet/item';

const BuildFleetTab = createReactClass({
  displayName: 'BuildFleetTab',

  propTypes: {
    buildingId: PropTypes.number.isRequired,
  },

  getInitialState() {
    return {
      show: 'now',
      filter: 'all',
      autoSelect: 'this',
    };
  },

  // mixins: [Reflux.connect(GetBuildableShipyardRPCStore, 'getBuildableStore')],

  handleShowChange(e) {
    this.setState({
      show: e.target.value,
    });
  },

  handleFilterChange(e) {
    this.setState({
      filter: e.target.value,
    });
  },

  handleAutoSelectChange(e) {
    this.setState({
      autoSelect: e.target.value,
    });
  },

  render() {
    const buildQueueAvailable =
      this.state.getBuildableStore.build_queue_max - this.state.getBuildableStore.build_queue_used;
    const fleetItems = [];
    const { buildable } = this.state.getBuildableStore;
    let fleetTypes = Object.keys(buildable);

    // Filter based on buildable now or later.
    if (this.state.show === 'now') {
      fleetTypes = _.filter(fleetTypes, (fleetType) => buildable[fleetType].can);
    } else if (this.state.show === 'later') {
      fleetTypes = _.filter(fleetTypes, (fleetType) => !buildable[fleetType].can);
    }

    // Filter based on ship type
    if (this.state.filter !== 'all') {
      const { filter } = this.state;
      fleetTypes = _.filter(fleetTypes, (fleetType) =>
        _.find(buildable[fleetType].tags, (o) => o === filter)
      );
    }

    fleetTypes.sort();
    const fleetTypesLen = fleetTypes.length;

    for (let i = 0; i < fleetTypesLen; i++) {
      fleetItems.push(
        <BuildFleetItem
          fleetType={fleetTypes[i]}
          obj={buildable[fleetTypes[i]]}
          buildingId={this.props.buildingId}
          autoSelect={this.state.autoSelect}
          cost={1}
        />
      );
    }

    return (
      <div>
        <div>
          There are {this.state.getBuildableStore.docks_available} docks available for new ships.
          You can queue {buildQueueAvailable} ships.
        </div>

        <div className='ui grid'>
          <div className='six wide column'>
            Use{' '}
            <select className='ui dropdown' ref='autoSelect' onChange={this.handleAutoSelectChange}>
              <option value='this'>This Only</option>
              <option value='all' selected>
                All
              </option>
              <option value='equal_or_higher'>Same or Higher Level</option>
              <option value='equal'>Same Level</option>
            </select>
          </div>

          <div className='five wide column'>
            Filter{' '}
            <select className='ui dropdown' ref='filter' onChange={this.handleFilterChange}>
              <option value='all' selected>
                All
              </option>
              <option value='Trade'>Trade</option>
              <option value='Mining'>Mining</option>
              <option value='Intelligence'>Intelligence</option>
              <option value='SupplyChain'>Supply Chain</option>
              <option value='WasteChain'>Waste Chain</option>
              <option value='War'>War</option>
              <option value='Colonization'>Colonization</option>
              <option value='Exploration'>Exploration</option>
            </select>
          </div>

          <div className='five wide column'>
            Show{' '}
            <select className='ui dropdown' ref='show' onChange={this.handleShowChange}>
              <option value='all'>All</option>
              <option value='now' selected>
                Can build now
              </option>
              <option value='later'>Can build later</option>
            </select>
          </div>
        </div>

        <div className='ui divider' />

        <div>{fleetItems}</div>
      </div>
    );
  },
});

export default BuildFleetTab;
