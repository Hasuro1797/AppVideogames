require('dotenv').config();
const express = require('express');
const router = express.Router();
const {API_KEY} = process.env;
const fetch = require('node-fetch');
//const db = require('../db.js');
const { Genre } = require('../db.js');

// Agregamos los generos desde una API a la base de datos

Genre.findAndCountAll()
.then(result =>{
    if(result.count){
        fetch(`https://api.rawg.io/api/genres?key=${API_KEY}`)
        .then(data => data.json())
        .then(genres =>{
            genres.results.forEach(element => {
                Genre.create({
                    name: element.name
                })
            });
        })
        .catch((error) => console.error(error))
    } 
})
.catch(error => console.error(error));

router.get('/',function(req,res){
    Genre.findAll()
    .then(genres => res.send(genres))
})

module.exports = router;