require('dotenv').config();
const { API_KEY } = process.env;
const fetch = require('node-fetch');
const { Platform } = require('../../db.js');

const addPlatforms = function(){
    // Agregamos los generos desde una API a la base de datos
    Platform.findAndCountAll()
    .then(results =>{
        if(results.count === 0){
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
    // Si exsite un error en el proceso
    .catch(error => console.error(error));
}

module.exports = addPlatforms;
