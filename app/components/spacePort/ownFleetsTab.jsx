import PropTypes from 'prop-types';

import React from 'react';
import createReactClass from 'create-react-class';

import constants from 'app/constants';

import ViewAllFleetsSpacePortRPCStore from 'app/stores/rpc/spacePort/viewAllFleets';

import OwnFleetItem from 'app/components/spacePort/ownFleets/item';

const OwnFleetsTab = createReactClass({
  displayName: 'OwnFleetsTab',

  propTypes: {
    buildingId: PropTypes.number.isRequired,
  },

  getInitialState() {
    return {
      task: 'all',
      tag: 'all',
      type: 'all',
      name: '',
    };
  },

  // mixins: [Reflux.connect(ViewAllFleetsSpacePortRPCStore, 'viewAllFleetsStore')],

  handleTaskChange(e) {
    this.setState({
      task: e.target.value,
    });
  },

  handleTagChange(e) {
    this.setState({
      tag: e.target.value,
    });
  },

  handleTypeChange(e) {
    this.setState({
      type: e.target.value,
    });
  },

  handleNameChange(e) {
    this.setState({
      name: e.target.value,
    });
  },

  render() {
    const fleetTypes = constants.FLEET_TYPES;
    const renderFleetTypes = [];
    for (const prop in fleetTypes) {
      if (fleetTypes.hasOwnProperty(prop)) {
        renderFleetTypes.push(<option value={prop}>{fleetTypes[prop]}</option>);
      }
    }

    const fleetTags = constants.FLEET_TAGS;
    const renderFleetTags = [];
    for (const prop2 in fleetTags) {
      if (fleetTags.hasOwnProperty(prop2)) {
        renderFleetTags.push(<option value={prop2}>{fleetTags[prop2]}</option>);
      }
    }

    const fleetTasks = constants.FLEET_TASKS;
    const renderFleetTasks = [];
    for (const prop3 in fleetTasks) {
      if (fleetTasks.hasOwnProperty(prop3)) {
        renderFleetTasks.push(<option value={prop3}>{fleetTasks[prop3]}</option>);
      }
    }

    let fleetItems = this.state.viewAllFleetsStore.fleets.slice(0);

    // Filter based on Task
    if (this.state.task !== 'all') {
      fleetItems = $.grep(fleetItems, function (item, index) {
        return item.task === this.state.task;
      });
    }

    // Filter based on Type
    if (this.state.type !== 'all') {
      fleetItems = $.grep(fleetItems, function (item, index) {
        return item.details.type === this.state.type;
      });
    }

    // Filter based on Tag
    if (this.state.tag !== 'all') {
      fleetItems = $.grep(fleetItems, (item, index) => 1);
    }

    const renderFleetItems = [];

    for (let i = 0; i < fleetItems.length; i++) {
      renderFleetItems.push(
        <OwnFleetItem obj={fleetItems[i]} buildingId={this.props.buildingId} />
      );
    }

    return (
      <div className='ui form'>
        <div className='equal width fields'>
          <div className='field'>
            <label>Task</label>
            <select className='ui small dropdown' ref='task' onChange={this.handleTaskChange}>
              <option value='All'>All</option>
              {renderFleetTasks}
            </select>
          </div>

          <div className='field'>
            <label>Tag</label>
            <select className='ui small dropdown' ref='tag' onChange={this.handleTagChange}>
              <option value='All'>All</option>
              {renderFleetTags}
            </select>
          </div>

          <div className='field'>
            <label>Type</label>
            <select className='ui small dropdown' ref='type' onChange={this.handleTypeChange}>
              <option value='all'>All</option>
              {renderFleetTypes}
            </select>
          </div>

          <div className='field'>
            <label>Name</label>
            <input type='text' ref='name' onChange={this.handleNameChange} />
          </div>
        </div>

        <div className='ui divider' />

        <div>{renderFleetItems}</div>
      </div>
    );
  },
});

export default OwnFleetsTab;
