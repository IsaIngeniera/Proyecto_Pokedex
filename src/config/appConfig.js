function createAppConfig(environment) {
  const port = Number(environment.PORT || 3000);

  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('PORT must be an integer between 1 and 65535.');
  }

  return Object.freeze({
    port,
    bucketName: environment.GCP_BUCKET || 'TU_BUCKET',
  });
}

module.exports = createAppConfig;
