const pokeneaRecords = [
  {
    "id": 1,
    "name": "Arepín",
    "height": 0.5,
    "ability": "Lanza arepas de energía que iluminan el camino.",
    "imageFile": "arepin.png",
    "philosophicalPhrase": "Hasta la arepa más pequeña necesita tiempo para crecer."
  },
  {
    "id": 2,
    "name": "Carrielón",
    "height": 1.2,
    "ability": "Guarda objetos infinitos en su carriel mágico.",
    "imageFile": "carrielon.png",
    "philosophicalPhrase": "Lleva recuerdos en el carriel y sueños en el corazón."
  },
  {
    "id": 3,
    "name": "Silleterix",
    "height": 1.6,
    "ability": "Construye escudos protectores con flores de colores.",
    "imageFile": "silleterix.png",
    "philosophicalPhrase": "El camino pesa menos cuando florece lo que llevas."
  },
  {
    "id": 4,
    "name": "Guarapón",
    "height": 0.9,
    "ability": "Recupera la energía de sus amigos con guarapo.",
    "imageFile": "guarapon.png",
    "philosophicalPhrase": "Descansar también hace parte de llegar lejos."
  },
  {
    "id": 5,
    "name": "Montañer",
    "height": 1.4,
    "ability": "Salta entre las montañas de Antioquia sin cansarse.",
    "imageFile": "montaner.png",
    "philosophicalPhrase": "Cada montaña se sube dando el primer paso."
  },
  {
    "id": 6,
    "name": "Tintico",
    "height": 0.4,
    "ability": "Aumenta su velocidad con el aroma del café.",
    "imageFile": "tintico.png",
    "philosophicalPhrase": "Las buenas ideas también necesitan una pausa."
  },
  {
    "id": 7,
    "name": "Orquídea",
    "height": 0.7,
    "ability": "Sana a sus compañeros con pétalos luminosos.",
    "imageFile": "orquidea.png",
    "philosophicalPhrase": "Florecer a tu ritmo también es avanzar."
  }
];

module.exports = Object.freeze(
  pokeneaRecords.map((pokeneaRecord) => Object.freeze(pokeneaRecord)),
);
