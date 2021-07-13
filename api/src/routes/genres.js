const express = require('express');
const router = express.Router();
const { requestGenres } = require('./middlewares/requestGenres');


router.get('/', requestGenres)

module.exports = router;