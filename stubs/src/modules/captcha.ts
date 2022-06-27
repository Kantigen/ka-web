import { Request, Response } from 'express';
import { Route } from '../interfaces.js';

const Captcha: Route = {
  fetch(req: Request, res: Response) {
    return {
      guid: '123456789',
      url: `${req.protocol}://${req.get('host')}/captcha.png`,
    };
  },

  solve(req, res) {
    return 1;
  },
};

export default Captcha;
