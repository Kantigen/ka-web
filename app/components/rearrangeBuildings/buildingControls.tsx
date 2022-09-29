import React from 'react';
import environment from 'app/environment';
import { MatrixBuilding } from 'app/interfaces/rearrangeBuildings';
import BodyRPCStore from 'app/stores/rpc/body';
import BuildingInfo from 'app/components/rearrangeBuildings/buildingInfo';

type Props = {
  building: MatrixBuilding;
  onMove(x: number, y: number): void;
};

class BuildingControls extends React.Component<Props> {
  render() {
    return (
      <>
        <BuildingInfo building={this.props.building} />

        <div className='block mb-6'>
          <div className='columns is-centered'>
            <div className='column is-narrow'>
              <button className='button is-primary px-5' onClick={() => this.props.onMove(0, 1)}>
                <i className='angle up icon' />
              </button>
            </div>
          </div>

          <div className='columns is-centered is-vcentered'>
            <div className='column is-narrow'>
              <button className='button is-primary py-5' onClick={() => this.props.onMove(-1, 0)}>
                <i className='angle left icon' />
              </button>
            </div>

            <div className='column is-narrow'>
              <div
                style={{
                  width: 100,
                  height: 100,
                  background: `url(${`${environment.getAssetsUrl()}planet_side/surface-${
                    BodyRPCStore.surfaceImage
                  }.jpg`})`,
                }}
              >
                <div
                  style={{
                    width: 100,
                    height: 100,
                    background: `url(${`${environment.getAssetsUrl()}planet_side/100/${
                      this.props.building.image
                    }.png`}) center center no-repeat`,
                  }}
                />
              </div>
            </div>

            <div className='column is-narrow'>
              <button className='button is-primary py-5' onClick={() => this.props.onMove(1, 0)}>
                <i className='angle right icon' />
              </button>
            </div>
          </div>

          <div className='columns is-centered'>
            <div className='column is-narrow'>
              <button className='button is-primary px-5' onClick={() => this.props.onMove(0, -1)}>
                <i className='angle down icon' />
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default BuildingControls;
