import React from 'react';
import { Building } from 'app/interfaces';

type Props = {
  building: Building;
};

class SpyTrainingStatus extends React.Component<Props> {
  render() {
    return this.props.building.spies ? (
      <div className='ui teal labels'>
        <div className='ui label'>
          Spies in training
          <div className='detail'>{this.props.building.spies.in_training}</div>
        </div>

        <div className='ui label'>
          Points / hr
          <div className='detail'>{this.props.building.spies.points_per}</div>
        </div>

        <div className='ui label'>
          Points / hr / training spy
          <div className='detail'>
            {this.props.building.spies.in_training > 0
              ? Math.floor(
                  this.props.building.spies.points_per / this.props.building.spies.in_training
                )
              : 0}
          </div>
        </div>

        <div className='ui label'>
          Maximum points
          <div className='detail'>{this.props.building.spies.max_points}</div>
        </div>
      </div>
    ) : (
      <div>Failed to load data</div>
    );
  }
}

export default SpyTrainingStatus;
