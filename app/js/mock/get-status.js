module.exports = () => {
    return {
        server: require('js/mock/server-status')(),
        empire: require('js/mock/empire-status')(),
        body: require('js/mock/body-status')(),
    };
};
