import React from 'react';
import _ from 'lodash';
import { Building, Fleet } from 'app/interfaces';
import FleetItem from 'app/components/spacePort/fleetItem';
import SpacePortService from 'app/services/spacePort';

type Props = {
  building: Building;
};

type State = {
  fleets: Fleet[],
  fleetCount: number,
  shipCount: number;
};

class TravellingFleetsTab extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { fleets: [], fleetCount: 0, shipCount: 0 };
  }

  async componentDidMount() {
    const res = await SpacePortService.viewTravellingFleets({ building_id: this.props.building.id });
    this.setState({
      fleets: res.travelling,
      fleetCount: res.number_of_fleets_travelling,
      shipCount: res.number_of_ships_travelling
    });
  }

  render() {
    return (
      <div>
        <div>Number of fleets: {this.state.fleetCount}, number of ships: {this.state.shipCount}</div>
        <div>{_.map(this.state.fleets, (fleet) => <FleetItem fleet={fleet} />)}</div>
      </div>
    );
  }
}

export default TravellingFleetsTab;
