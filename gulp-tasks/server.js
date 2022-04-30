import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default function (done) {
  const app = express();
  const port = process.env.PORT || 80;
  const dir = path.join(__dirname, '..');
  console.log('Servering static files from', dir);
  app.use(express.static(dir));

  app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}/ for requests.`);
    done();
  });
}
