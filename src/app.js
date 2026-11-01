const path = require('node:path');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const Pokenea = require('./models/Pokenea');
const PokeneaController = require('./controllers/User/PokeneaController');
const pokeneaRecords = require('./data/pokeneas');
const registerWebRoutes = require('./routes/web');

function createApp(appConfig, containerIdProvider, randomNumberGenerator) {
  const app = express();
  const router = express.Router();
  const pokeneaController = new PokeneaController(
    Pokenea,
    pokeneaRecords,
    randomNumberGenerator,
    containerIdProvider,
    appConfig.bucketName,
  );
  app.disable('x-powered-by');
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, 'views'));
  app.set('layout', 'layouts/app');
  app.use(expressLayouts);
  app.use('/assets', express.static(path.join(__dirname, '..', 'public')));
  app.use(registerWebRoutes(router, pokeneaController));

  return app;
}

module.exports = createApp;
