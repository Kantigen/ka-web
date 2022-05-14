import React from 'react';
import PropTypes from 'prop-types';

import constants from 'app/constants';
import resources from 'app/json/resources';
import BodyRPCStore from 'app/stores/rpc/body';

class BuildingInformation extends React.Component {
  static propTypes = {
    options: PropTypes.object.isRequired,
  };

  getImageUrl = () => `${constants.ASSETS_URL}planet_side/100/${this.props.options.image}.png`;

  render() {
    return (
      <div
        style={{
          paddingBottom: 5,
          display: 'inline-block',
        }}
      >
        <div
          style={{
            width: 120,
            height: 120,
            float: 'left',
            backgroundImage: `url(${constants.ASSETS_URL}planet_side/surface-${BodyRPCStore.image}.jpg)`,
          }}
        >
          <div
            style={{
              width: 100,
              height: 100,
              margin: 10,
              backgroundImage: `url(${this.getImageUrl()})`,
            }}
          ></div>
        </div>

        <div
          style={{
            display: 'inline-block',
            marginLeft: 10,
            width: 550,
            float: 'right',
          }}
        >
          <strong style={{ fontSize: '1.2em' }}>
            {this.props.options.name} {this.props.options.level} (ID: {this.props.options.id})
          </strong>

          <p>
            {resources.buildings[this.props.options.url].description}
            <br />
            <a
              target='_blank'
              href={resources.buildings[this.props.options.url].wiki}
              style={{ color: '#fff' }}
              rel='noreferrer'
            >
              More information on Wiki.
            </a>
          </p>
        </div>
      </div>
    );
  }
}

export default BuildingInformation;
