import React from 'react';
import _ from 'lodash';
import SpacePort from 'app/services/spacePort';
import BodyRPCStore from 'app/stores/rpc/body';
import { StarInfoWindowOptions } from 'app/interfaces/window';
import { Fleet } from 'app/interfaces/spacePort';
import FleetItem from 'app/components/spacePort/fleetItem';

type Props = {
  options: StarInfoWindowOptions;
};

type State = {
  fleets: Fleet[];
};

class SendFleetsTab extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      fleets: [],
    };
  }

  async componentDidMount() {
    const { available } = await SpacePort.viewAvailableFleets({
      body_id: BodyRPCStore.id,
      target: { star_id: this.props.options.id },
    });
    this.setState({ fleets: available });
  }

  async sendFleet(fleetId: number) {
    const res = await SpacePort.sendFleet({
      fleet_id: fleetId,
      target: { star_id: this.props.options.id },
      quantity: 1,
    });
    console.log(res);
  }

  render() {
    return (
      <div>
        {_.map(this.state.fleets, (fleet) => (
          <FleetItem fleet={fleet}>
            <div>
              <button className='ui green button' onClick={() => this.sendFleet(fleet.id)}>
                Send 1
              </button>
            </div>
          </FleetItem>
        ))}
      </div>
    );
  }
}

export default SendFleetsTab;
