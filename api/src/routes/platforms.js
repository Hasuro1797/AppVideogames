require('dotenv').config();
const express = require('express');
const router = express.Router();
const {API_KEY} = process.env;
const fetch = require('node-fetch');
const { Platform } = require('../db.js');

// Agregamos los generos desde una API a la base de datos
Platform.findAndCountAll()
.then(results =>{
    if(results.count){
        fetch(`https://api.rawg.io/api/platforms/lists/parents?key=${API_KEY}`)
        .then(data => data.json())
        .then(platforms =>{
            // Recorremos el array de plataformas existentes en la API
            platforms.results.forEach(typeOfPlatform => {
                typeOfPlatform.platforms.forEach(element => {
                    // Creamos las plataformas
                    Platform.create({
                        name: element.name
                    })
                })
            });
        })
        .catch((error) => console.error(error))
    }
})
.catch(error => console.error(error));
// Si exsite un error en el proceso

// ruta para obtener las consolas disponibles enla base de datos
router.get('/',function(req,res){
    Platform.findAll()
    // Si se ontuvieron las plataformas con exito
    .then(platforms => res.send(platforms))
    // Si hubo algun error en eñ proceso
    .catch(error=>{
        console.error(error);
        res.status(500).sen(error);
    })
})

module.exports = router;