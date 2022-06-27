import { Route } from '../interfaces.js';

const Map: Route = {
  get_star_map(req, res) {
    return {
      stars: [
        {
          name: 'Sol',
          color: 'yellow',
          x: -41,
          y: 27,
          id: 99,
          bodies: [
            {
              name: 'Mercury',
              id: 345,
              orbit: 1,
              x: -40,
              y: 29,
              type: 'habitable planet',
              image: 'p13-1',
              size: 58,
              empire: {
                id: 945,
                name: 'Earthlings',
                alignment: 'self',
                is_isolationist: 1,
              },
            },
            {
              name: 'Vesta',
              id: 346,
              orbit: 2,
              x: -39,
              y: 28,
              type: 'asteroid',
              image: 'p33-2',
              size: 3,
              body_has_fissure: 1,
            },
          ],
        },
      ],
    };
  },
};

export default Map;
