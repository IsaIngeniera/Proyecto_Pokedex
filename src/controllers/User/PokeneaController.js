class PokeneaController {
  #pokeneaModel;
  #pokeneaRecords;
  #randomNumberGenerator;
  #containerIdProvider;
  #bucketName;

  constructor(pokeneaModel, pokeneaRecords, randomNumberGenerator, containerIdProvider, bucketName) {
    this.#pokeneaModel = pokeneaModel;
    this.#pokeneaRecords = pokeneaRecords;
    this.#randomNumberGenerator = randomNumberGenerator;
    this.#containerIdProvider = containerIdProvider;
    this.#bucketName = bucketName;
  }

  redirectHome(request, response) {
    return response.redirect('/pokeneas');
  }

  showJson(request, response) {
    const pokenea = this.#pokeneaModel.getRandom(this.#pokeneaRecords, this.#randomNumberGenerator);
    response.set('Cache-Control', 'no-store');

    return response.json({
      id: pokenea.getId(),
      name: pokenea.getName(),
      height: pokenea.getHeight(),
      ability: pokenea.getAbility(),
      containerId: this.#containerIdProvider(),
    });
  }

  index(request, response) {
    const pokenea = this.#pokeneaModel.getRandom(this.#pokeneaRecords, this.#randomNumberGenerator);
    const viewData = {
      pageTitle: 'Pokeneas de Antioquia',
      pokenea: {
        id: pokenea.getId(),
        name: pokenea.getName(),
        height: pokenea.getHeight(),
        ability: pokenea.getAbility(),
        imageFile: pokenea.getImageFile(),
        philosophicalPhrase: pokenea.getPhilosophicalPhrase(),
      },
      bucketName: this.#bucketName,
      containerId: this.#containerIdProvider(),
      pokeneaCount: this.#pokeneaRecords.length,
    };
    response.set('Cache-Control', 'no-store');

    return response.render('User/pokeneas/index', { viewData });
  }
}

module.exports = PokeneaController;
