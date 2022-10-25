import React from 'react';
//@ts-expect-error
import resources from 'app/json/resources';
import BodyRPCStore from 'app/stores/rpc/body';
import environment from 'app/environment';
import { BuildingWindowOptions } from 'app/interfaces';

type Props = {
  options: BuildingWindowOptions;
};

class BuildingInformation extends React.Component<Props> {
  render() {
    return (
      <div className='bulma'>
        <div className='columns is-vcentered mx-4 mb-2'>
          <div className='column is-one-quarter'>
            <div
              className='columns is-centered is-vcentered'
              style={{
                backgroundImage: `url(${environment.getAssetsUrl()}planet_side/surface-${
                  BodyRPCStore.surfaceImage
                }.jpg)`,
                borderRadius: 5,
              }}
            >
              <div
                className='column m-2'
                style={{
                  width: 100,
                  height: 100,
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  backgroundImage: `url(${environment.getAssetsUrl()}planet_side/100/${
                    this.props.options.image
                  }.png)`,
                }}
              />
            </div>
          </div>

          <div className='column'>
            <h1 className='title is-size-5 mb-2'>
              {this.props.options.name} {this.props.options.level} (ID: {this.props.options.id})
            </h1>

            <div className='mb-2'>{resources.buildings[this.props.options.url].description}</div>

            <div>
              <a
                target='_blank'
                href={resources.buildings[this.props.options.url].wiki}
                rel='noopener noreferrer'
              >
                More information on Wiki.
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BuildingInformation;
