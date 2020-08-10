module.exports = () => {
    return {
        session_id: 'this_is_a_session_id',
        status: require('js/mock/get-status')(),
    };
};
