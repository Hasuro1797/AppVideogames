const express = require('express');
const router = express.Router();
const { requestVideogame } = require('./middlewares/requestVideogames');


//* Ruta para obtener los video juegos en la base de datos
router.get('/',requestVideogame);

module.exports = router;