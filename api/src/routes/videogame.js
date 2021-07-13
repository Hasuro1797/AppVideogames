const express = require('express');
const router = express.Router();
const {requestById} = require('./middlewares/requesById');
const { createVideoGame } = require('./middlewares/createVideoGame');


//GET: con el id del video juego
router.get('/:idVideogame', requestById);

// post: crear un nuevo viedo juego
router.post('/', createVideoGame);


module.exports = router;