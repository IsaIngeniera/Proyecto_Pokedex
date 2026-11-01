class Pokenea {
  #id;
  #name;
  #height;
  #ability;
  #imageFile;
  #philosophicalPhrase;

  constructor(pokeneaRecord) {
    this.#id = pokeneaRecord.id;
    this.#name = pokeneaRecord.name;
    this.#height = pokeneaRecord.height;
    this.#ability = pokeneaRecord.ability;
    this.#imageFile = pokeneaRecord.imageFile;
    this.#philosophicalPhrase = pokeneaRecord.philosophicalPhrase;
  }

  getId() {
    return this.#id;
  }

  getName() {
    return this.#name;
  }

  getHeight() {
    return this.#height;
  }

  getAbility() {
    return this.#ability;
  }

  getImageFile() {
    return this.#imageFile;
  }

  getPhilosophicalPhrase() {
    return this.#philosophicalPhrase;
  }

  static getRandom(pokeneaRecords, randomNumberGenerator) {
    if (pokeneaRecords.length === 0) {
      throw new Error('The Pokenea collection cannot be empty.');
    }

    const randomValue = randomNumberGenerator();

    if (!Number.isFinite(randomValue) || randomValue < 0 || randomValue >= 1) {
      throw new Error('The random value must be between zero inclusive and one exclusive.');
    }

    const randomIndex = Math.floor(randomValue * pokeneaRecords.length);

    return new Pokenea(pokeneaRecords[randomIndex]);
  }
}

module.exports = Pokenea;
