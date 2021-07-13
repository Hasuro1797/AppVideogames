const express = require('express');
const router = express.Router();
const { requestPlatforms } = require('./middlewares/requestPlatforms');

// ruta para obtener las consolas disponibles enla base de datos
router.get('/',requestPlatforms)

module.exports = router;