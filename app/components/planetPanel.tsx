import React from 'react';
import PropTypes from 'prop-types';
import BodyService from 'app/services/body';

import PlanetDetailsTab from 'app/components/planetPanel/planetDetailsTab';
import { Tabber } from 'app/components/tabber';

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

  async componentDidMount() {
    const { body } = await BodyService.getStatus(1); // TODO: send request with correct ID instead of `1`

    this.setState({
      status: {
        id: body.id,
        x: body.x,
        y: body.y,
        zone: body.zone,
        star_id: body.star_id,
        star_name: body.star_name,
        orbit: body.orbit,
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
  }

  render() {
    return (
      <Tabber
        tabs={[
          {
            title: 'Planet Details',
            component: () => <PlanetDetailsTab status={this.state.status} />,
          },
          {
            title: 'My Fleets',
            component: () => <p>Not Yet Implemented</p>,
          },
          {
            title: 'Foreign Fleets',
            component: () => <p>Not Yet Implemented</p>,
          },
        ]}
      />
    );
  }
}

export default PlanetPanel;
