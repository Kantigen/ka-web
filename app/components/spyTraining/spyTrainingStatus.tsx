import React from 'react';
import { SpyTrainingBuilding } from 'app/interfaces';

type Props = {
  building: SpyTrainingBuilding;
};

class SpyTrainingStatus extends React.Component<Props> {
  render() {
    return this.props.building.spies ? (
      <div className='bulma'>
        <div className='field is-grouped is-grouped-multiline'>
          <div className='control'>
            <div className='tags has-addons are-medium'>
              <span className='tag is-dark'>Spies in training</span>
              <span className='tag is-primary'>{this.props.building.spies.in_training}</span>
            </div>
          </div>

          <div className='control'>
            <div className='tags has-addons are-medium'>
              <span className='tag is-dark'>Points / hr</span>
              <span className='tag is-primary'>{this.props.building.spies.points_per}</span>
            </div>
          </div>

          <div className='control'>
            <div className='tags has-addons are-medium'>
              <span className='tag is-dark'>Points / hr / training spy</span>
              <span className='tag is-primary'>
                {this.props.building.spies.in_training > 0
                  ? Math.floor(
                      this.props.building.spies.points_per / this.props.building.spies.in_training
                    )
                  : 0}
              </span>
            </div>
          </div>

          <div className='control'>
            <div className='tags has-addons are-medium'>
              <span className='tag is-dark'>Maximum points</span>
              <span className='tag is-primary'>{this.props.building.spies.max_points}</span>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div>Failed to load data</div>
    );
  }
}

export default SpyTrainingStatus;
