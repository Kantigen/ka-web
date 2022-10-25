import { Building } from 'app/interfaces/building';
import React from 'react';
import Shipyard from 'app/services/shipyard';
import { int } from 'app/util';

type Props = {
  building: Building;
  autoSelect: string;
  fleetType: string;
};

type State = {
  quantity: string;
};

class BuildButton extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      quantity: '1',
    };
  }

  updateQuantity(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ quantity: e.target.value });
  }

  async buildFleet() {
    console.log(`Building ${this.state.quantity} of ${this.props.fleetType}`);
    const res = await Shipyard.buildFleet({
      building_ids: [this.props.building.id],
      quantity: int(this.state.quantity),
      type: this.props.fleetType,
      auto_select: 'this', // TODO: this is wrong
    });
    console.log(res);
  }

  render() {
    return (
      <div className='ui fluid action input'>
        <input
          type='number'
          placeholder='Qty.'
          value={this.state.quantity}
          onChange={(e) => this.updateQuantity(e)}
        />
        <div className='ui green button' onClick={() => this.buildFleet()}>
          Build
        </div>
      </div>
    );
  }
}

export default BuildButton;
