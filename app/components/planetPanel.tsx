import React from 'react';
import PropTypes from 'prop-types';
import server from 'app/server';
import * as util from 'app/util';

import PlanetDetailsTab from 'app/components/planetPanel/planetDetailsTab';
import { Tab, Tabs } from 'app/components/tabber';

class PlanetPanel extends React.Component {
  static propTypes = {
    options: PropTypes.object,
  };

  state = {
    status: {
      id: 0,
      x: 0,
      y: 0,
      zone: '',
      star_id: '',
      star_name: '',
      orbit: 0,
      type: '',
      name: '',
      image: '',
      size: 0,
      water: 0,
      ore: {
        anthracite: 0,
        bauxite: 0,
        beryl: 0,
        chromite: 0,
        chalcopyrite: 0,
        fluorite: 0,
        galena: 0,
        goethite: 0,
        gold: 0,
        gypsum: 0,
        halite: 0,
        kerogen: 0,
        magnetite: 0,
        methane: 0,
        monazite: 0,
        rutile: 0,
        sulfur: 0,
        trona: 0,
        uraninite: 0,
        zircon: 0,
      },

      //
      // TODO: are these blocks returned.. do we need to handle them?
      //
      empire: {
        id: '',
        name: '',
        alignment: '',
        is_isolationist: 0,
      },
      station: {
        id: 0,
        x: 0,
        y: 0,
        name: '',
      },
      alliance: {
        id: '',
        name: '',
      },
      influence: {
        total: 0,
        spent: 0,
      },
    },
  };

  componentDidMount() {
    server.call({
      module: 'body',
      method: 'get_status',
      params: {
        id: 1, // TODO
      },
      success: ({ body }) => {
        this.setState({
          status: {
            id: body.id,
            x: util.int(body.x),
            y: util.int(body.y),
            zone: body.zone,
            star_id: body.star_id,
            star_name: body.star_name,
            orbit: util.int(body.orbit),
            type: body.type,
            name: body.name,
            image: body.image,
            size: body.size,
            water: body.water,

            ore: {
              anthracite: body.ore.anthracite,
              bauxite: body.ore.bauxite,
              beryl: body.ore.beryl,
              chromite: body.ore.chromite,
              chalcopyrite: body.ore.chalcopyrite,
              fluorite: body.ore.fluorite,
              galena: body.ore.galena,
              goethite: body.ore.goethite,
              gold: body.ore.gold,
              gypsum: body.ore.gypsum,
              halite: body.ore.halite,
              kerogen: body.ore.kerogen,
              magnetite: body.ore.magnetite,
              methane: body.ore.methane,
              monazite: body.ore.monazite,
              rutile: body.ore.rutile,
              sulfur: body.ore.sulfur,
              trona: body.ore.trona,
              uraninite: body.ore.uraninite,
              zircon: body.ore.zircon,
            },
          },
        });
      },
    });
  }

  render() {
    console.log('Rendering...', this.state.status);

    const tabs = [];
    tabs.push(
      <Tab title='Planet Details' key='Planet Details'>
        <PlanetDetailsTab status={this.state.status} />
      </Tab>
    );

    tabs.push(
      <Tab title='My Fleets' key='My Fleets'>
        <p>Not Yet Implemented</p>
      </Tab>
    );

    tabs.push(
      <Tab title='Foreign Fleets' key='Foreign Fleets'>
        <p>Not Yet Implemented</p>
      </Tab>
    );

    return <Tabs>{tabs}</Tabs>;
  }
}

export default PlanetPanel;
