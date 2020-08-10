module.exports = () => {
    return {
        id: '1',
        bodies: {
            colonies: [
                {
                    id: '1',
                    name: 'Earth',
                    x: '0',
                    y: '0',
                    orbit: 1,
                    empire_name: 'Rome',
                    empire_id: 1,
                },
            ],
            mystations: [
                {
                    id: '2',
                    name: 'Death Star',
                    x: '100',
                    y: '-50',
                    orbit: 2,
                    empire_name: 'Rome',
                    empire_id: 1,
                },
            ],
        },
        colonies: {
            '1': 'Earth',
        },
        rpc_count: 250,
        insurrect_value: 100000,
        is_isolationist: 0,
        name: 'Rome',
        status_message: 'Making the Lacuna Expanse a better Expanse',
        home_planet_id: '1',
        has_new_messages: 4,
        latest_message_id: 4,
        essentia: 521,
        next_colony_cost: 100000,
        next_station_cost: 1000000,
        planets: {
            '1': 'Earth',
            '2': 'Death Star',
        },
        tech_level: 30,
        self_destruct_active: 0,
        self_destruct_date: '',
        stations: {
            '2': 'Death Star',
        },
        primary_embassy_id: 100,
    };
};
