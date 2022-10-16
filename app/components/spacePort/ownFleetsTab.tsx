import React from 'react';

import constants from 'app/constants';
import SpacePortService from 'app/services/spacePort';
import { Building } from 'app/interfaces';
import { Fleet } from 'app/interfaces/spacePort';
import _ from 'lodash';

import FleetItem from 'app/components/spacePort/fleetItem';

type Props = {
  building: Building;
};

type State = {
  task: string;
  tag: string;
  type: string;
  name: string;
  fleets: Fleet[],
  count: number;
}

class OwnFleetsTab extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      task: 'all',
      tag: 'all',
      type: 'all',
      name: '',
      fleets: [],
      count: 0,
    };
  }

  async componentDidMount() {
    console.log(this.props.building.id);
    const res = await SpacePortService.viewAllFleets({ building_id: this.props.building.id });
    this.setState({
      fleets: res.fleets,
      count: res.number_of_fleets,
    });
  }

  handleFilterChange(e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) {
    // TODO: why do we need ...this.state for typescript to accept this?
    this.setState({ ...this.state, ...{ [e.target.name]: e.target.value }});
  }

  render() {
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

        <div>{_.map(this.state.fleets, (fleet) => <FleetItem fleet={fleet} />)}</div>
      </div>
    );
  }
}

export default OwnFleetsTab;
