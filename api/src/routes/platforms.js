require('dotenv').config();
const express = require('express');
const router = express.Router();
const {API_KEY} = process.env;
const fetch = require('node-fetch');
//const db = require('../db.js');
const { Platform } = require('../db.js');

// Agregamos los generos desde una API a la base de datos

fetch(`https://api.rawg.io/api/platforms/lists/parents?key=${API_KEY}`)
.then(data => data.json())
.then(platforms =>{
    platforms.results.forEach(typeOfPlatform => {
        typeOfPlatform.platforms.forEach(element => {
            Platform.create({
                name: element.name
            })
        })
    });
})
.catch((error) => console.error(error))

router.get('/',function(req,res){
    Platform.findAll()
    .then(platforms => res.send(platforms))
})

module.exports = router;