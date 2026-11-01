function registerWebRoutes(router, pokeneaController) {
  const homePath = '/';
  const pokeneaPath = '/pokeneas';
  const apiPath = '/api';
  router.get(homePath, pokeneaController.redirectHome.bind(pokeneaController));
  router.get(pokeneaPath, pokeneaController.index.bind(pokeneaController));
  router.get(apiPath + pokeneaPath, pokeneaController.showJson.bind(pokeneaController));

  return router;
}

module.exports = registerWebRoutes;
