import express from 'express';
import _ from 'lodash';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import Routes from './src/routes.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = `${__dirname}/public`;

const app = express();
const port = 3001;

//
// Middleware to enable CORS
//
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', req.get('origin') || '');
  res.setHeader('Access-Control-Allow-Headers', 'content-type,x-requested-with');
  next();
});

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/announcement', (req, res) => {
  res.sendFile('announcement.html', { root });
});

app.get('/captcha.png', (req, res) => {
  res.sendFile('captcha.png', { root });
});

app.get('/email_attachment.png', (req, res) => {
  res.sendFile('email_attachment.png', { root });
});

app.get('/server_overviewon', (req, res) => {
  res.sendFile('server_overviewon', { root });
});

app.post('/:module', (req, res) => {
  const { module } = req.params;
  const method = req.body?.method || '';
  const params = req.body?.params || '';

  console.log(`${_.capitalize(module)}#${method} was called`, params);

  const result = Routes[module]?.[method]?.(req, res);

  if (result) {
    return res.json({
      jsonrpc: '2.0',
      id: 1,
      result,
    });
  }

  const message =
    !!module && !!method
      ? `Call to stubbed endpoint ${_.capitalize(module)}#${method} not implemented yet.`
      : 'Invalid request.';

  console.error(message);

  return res.status(500).json({
    jsonrpc: '2.0',
    id: 1,
    error: { message, data: null },
  });
});

app.listen(port, () => {
  console.log(`KA Stub Server listening on port ${port}`);
});
