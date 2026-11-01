const os = require('node:os');
const createApp = require('./app');
const createAppConfig = require('./config/appConfig');

const appConfig = createAppConfig(process.env);
const app = createApp(appConfig, os.hostname, Math.random);

app.listen(appConfig.port, '0.0.0.0', () => {
  console.log(`Pokeneas is listening on port ${appConfig.port}`);
});
