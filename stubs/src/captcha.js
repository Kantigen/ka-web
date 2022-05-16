const Captcha = {
  fetch(req, res) {
    return {
      guid: '123456789',
      url: `${req.protocol}://${req.get('host')}/captcha.png`,
    };
  },

  solve() {
    return 1;
  },
};

export default Captcha;
