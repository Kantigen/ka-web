import React from 'react';

import constants from 'app/constants';
import { Building } from 'app/interfaces';
import _ from 'lodash';

import OwnFleetItem from 'app/components/spacePort/ownFleets/item';

type Props = {
  building: Building;
};

class OwnFleetsTab extends React.Component<Props> {
  constructor(props: any) {
    super(props);
    this.state = {
      task: 'all',
      tag: 'all',
      type: 'all',
      name: '',
    };
  }

  handleFilterChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const fleetItems = [];

    // // Filter based on Task
    // if (this.state.task !== 'all') {
    //   fleetItems = $.grep(fleetItems, function (item, index) {
    //     return item.task === this.state.task;
    //   });
    // }

    // // Filter based on Type
    // if (this.state.type !== 'all') {
    //   fleetItems = $.grep(fleetItems, function (item, index) {
    //     return item.details.type === this.state.type;
    //   });
    // }

    // // Filter based on Tag
    // if (this.state.tag !== 'all') {
    //   fleetItems = $.grep(fleetItems, (item, index) => 1);
    // }

    return (
      <div className='ui form'>
        <div className='equal width fields'>
          <div className='field'>
            <label>Task</label>
            <select
              className='ui small dropdown'
              name='task'
              onChange={(e) => this.handleFilterChange(e)}
            >
              <option value='All'>All</option>
              {_.map(constants.FLEET_TASKS, (task, key) => (
                <option value={key} key={key}>
                  {task}
                </option>
              ))}
            </select>
          </div>

          <div className='field'>
            <label>Tag</label>
            <select
              className='ui small dropdown'
              name='tag'
              onChange={(e) => this.handleFilterChange(e)}
            >
              <option value='All'>All</option>
              {_.map(constants.FLEET_TAGS, (tag, key) => (
                <option value={key} key={key}>
                  {tag}
                </option>
              ))}
            </select>
          </div>

          <div className='field'>
            <label>Type</label>
            <select
              className='ui small dropdown'
              name='type'
              onChange={(e) => this.handleFilterChange(e)}
            >
              <option value='all'>All</option>
              {_.map(constants.FLEET_TYPES, (type, key) => (
                <option value={key} key={key}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className='field'>
            <label>Name</label>
            <input type='text' name='name' onChange={(e) => this.handleFilterChange(e)} />
          </div>
        </div>

        <div className='ui divider' />

        <div>{fleetItems}</div>
      </div>
    );
  }
}

export default OwnFleetsTab;
