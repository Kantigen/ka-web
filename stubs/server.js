import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import Body from './src/body.js';
import Buildings from './src/buildings.js';
import Captcha from './src/captcha.js';
import Empire from './src/empire.js';
import EssentiaVein from './src/essentiaVein.js';
import Inbox from './src/inbox.js';
import GenericBuilding from './src/genericBuilding.js';
import Map from './src/map.js';
import Server from './src/server.js';
import Spaceport from './src/spaceport.js';
import Stats from './src/stats.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = `${__dirname}/public`;

const modules = {
  body: Body,
  buildings: Buildings,
  captcha: Captcha,
  empire: Empire,
  inbox: Inbox,
  map: Map,
  server: Server,
  stats: Stats,

  //
  // Buildings
  //
  algae: GenericBuilding,
  algaepond: GenericBuilding,
  alliance: GenericBuilding,
  amalgusmeadow: GenericBuilding,
  apple: GenericBuilding,
  archaeology: GenericBuilding,
  artmuseum: GenericBuilding,
  atmosphericevaporator: GenericBuilding,
  beach: GenericBuilding,
  bean: GenericBuilding,
  beeldeban: GenericBuilding,
  beeldebannest: GenericBuilding,
  blackholegenerator: GenericBuilding,
  bread: GenericBuilding,
  burger: GenericBuilding,
  capitol: GenericBuilding,
  cheese: GenericBuilding,
  chip: GenericBuilding,
  cider: GenericBuilding,
  citadelofknope: GenericBuilding,
  cloakinglab: GenericBuilding,
  corn: GenericBuilding,
  cornmeal: GenericBuilding,
  crashedshipsite: GenericBuilding,
  crater: GenericBuilding,
  culinaryinstitute: GenericBuilding,
  dairy: GenericBuilding,
  denton: GenericBuilding,
  dentonbrambles: GenericBuilding,
  deployedbleeder: GenericBuilding,
  development: GenericBuilding,
  distributioncenter: GenericBuilding,
  embassy: GenericBuilding,
  energyreserve: GenericBuilding,
  entertainment: GenericBuilding,
  espionage: GenericBuilding,
  essentiavein: EssentiaVein,
  fission: GenericBuilding,
  fissure: GenericBuilding,
  foodreserve: GenericBuilding,
  fusion: GenericBuilding,
  gasgiantlab: GenericBuilding,
  gasgiantplatform: GenericBuilding,
  geneticslab: GenericBuilding,
  geo: GenericBuilding,
  geothermalvent: GenericBuilding,
  gratchsgauntlet: GenericBuilding,
  greatballofjunk: GenericBuilding,
  grove: GenericBuilding,
  hallsofvrbansk: GenericBuilding,
  hydrocarbon: GenericBuilding,
  ibs: GenericBuilding,
  intelligence: GenericBuilding,
  inteltraining: GenericBuilding,
  interdimensionalrift: GenericBuilding,
  junkhengesculpture: GenericBuilding,
  kalavianruins: GenericBuilding,
  kasternskeep: GenericBuilding,
  lagoon: GenericBuilding,
  lake: GenericBuilding,
  lapis: GenericBuilding,
  lapisforest: GenericBuilding,
  lcota: GenericBuilding,
  lcotb: GenericBuilding,
  lcotc: GenericBuilding,
  lcotd: GenericBuilding,
  lcote: GenericBuilding,
  lcotf: GenericBuilding,
  lcotg: GenericBuilding,
  lcoth: GenericBuilding,
  lcoti: GenericBuilding,
  libraryofjith: GenericBuilding,
  luxuryhousing: GenericBuilding,
  malcud: GenericBuilding,
  malcudfield: GenericBuilding,
  massadshenge: GenericBuilding,
  mayhemtraining: GenericBuilding,
  mercenariesguild: GenericBuilding,
  metaljunkarches: GenericBuilding,
  mine: GenericBuilding,
  miningministry: GenericBuilding,
  missioncommand: GenericBuilding,
  munitionslab: GenericBuilding,
  naturalspring: GenericBuilding,
  network19: GenericBuilding,
  observatory: GenericBuilding,
  operahouse: GenericBuilding,
  oracleofanid: GenericBuilding,
  orerefinery: GenericBuilding,
  orestorage: GenericBuilding,
  oversight: GenericBuilding,
  pancake: GenericBuilding,
  pantheonofhagness: GenericBuilding,
  park: GenericBuilding,
  parliament: GenericBuilding,
  pie: GenericBuilding,
  pilottraining: GenericBuilding,
  planetarycommand: GenericBuilding,
  policestation: GenericBuilding,
  politicstraining: GenericBuilding,
  potato: GenericBuilding,
  propulsion: GenericBuilding,
  pyramidjunksculpture: GenericBuilding,
  ravine: GenericBuilding,
  rockyoutcrop: GenericBuilding,
  sand: GenericBuilding,
  saw: GenericBuilding,
  security: GenericBuilding,
  shake: GenericBuilding,
  shipyard: GenericBuilding,
  singularity: GenericBuilding,
  soup: GenericBuilding,
  spacejunkpark: GenericBuilding,
  spaceport: Spaceport,
  ssla: GenericBuilding,
  sslb: GenericBuilding,
  sslc: GenericBuilding,
  ssld: GenericBuilding,
  stationcommand: GenericBuilding,
  stockpile: GenericBuilding,
  subspacesupplydepot: GenericBuilding,
  supplypod: GenericBuilding,
  syrup: GenericBuilding,
  templeofthedrajilites: GenericBuilding,
  terraforminglab: GenericBuilding,
  terraformingplatform: GenericBuilding,
  thedillonforge: GenericBuilding,
  thefttraining: GenericBuilding,
  themepark: GenericBuilding,
  trade: GenericBuilding,
  transporter: GenericBuilding,
  university: GenericBuilding,
  volcano: GenericBuilding,
  warehouse: GenericBuilding,
  wastedigester: GenericBuilding,
  wasteenergy: GenericBuilding,
  wasteexchanger: GenericBuilding,
  wasterecycling: GenericBuilding,
  wastesequestration: GenericBuilding,
  wastetreatment: GenericBuilding,
  waterproduction: GenericBuilding,
  waterpurification: GenericBuilding,
  waterreclamation: GenericBuilding,
  waterstorage: GenericBuilding,
  wheat: GenericBuilding,
};

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

app.get('/server_overview.json', (req, res) => {
  res.sendFile('server_overview.json', { root });
});

app.post('/:module', (req, res) => {
  const { module } = req.params;
  const method = req.body?.method || '';

  console.log(`${module} ${method} was called`);

  const result =
    modules[module] && modules[module][method] ? modules[module][method](req, res) : undefined;

  if (result) {
    console.log('Rendering result:', result);
    return res.json({
      jsonrpc: '2.0',
      id: 1,
      result,
    });
  }
  return res.status(500).json({
    jsonrpc: '2.0',
    id: 1,
    error: {
      message: 'Invalid request.',
      data: null,
    },
  });
});

app.listen(port, () => {
  console.log(`KA Stub Server listening on port ${port}`);
});
