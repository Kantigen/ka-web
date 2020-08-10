'use strict';

const { Server } = require('miragejs');

const MockedKA = {
    getStatus: require('js/mock/get-status'),

    empire: {
        login: require('js/mock/empire-login'),
    },

    body: {
        getBuildings: require('js/mock/body-get-buildings'),
    },
};

const handleResponse = (module, response) => {
    const json = JSON.parse(response.requestBody);
    console.log(`/${module}/${json.method}`, json.params);
    return {
        method: json.method,
        params: json.params,
    };
};

const setupMocking = () => {
    console.log('Server mocking enabled');
    new Server({
        routes() {
            this.namespace = process.env.KA_SERVER_URL;

            this.post('/body', (_schema, response) => {
                const { method } = handleResponse('empire', response);
                switch (method) {
                    case 'get_buildings':
                        return { result: MockedKA.body.getBuildings() };
                    default:
                        console.error(`/body/${method} not handled`);
                        return {};
                }
            });

            this.post('/empire', (_schema, response) => {
                const { method } = handleResponse('empire', response);
                switch (method) {
                    case 'login':
                        return { result: MockedKA.empire.login() };
                    case 'logout':
                        return { logout: '1' };
                    case 'get_status':
                        return { result: MockedKA.getStatus() };
                    default:
                        console.error(`/empire/${method} not handled`);
                        return {};
                }
            });
        },
    });
};

module.exports.setupMocking = setupMocking;
