require('dotenv').config();
const {API_KEY} = process.env;
const fetch = require('node-fetch');
const { Genre } = require('../../db.js');

const addGenres = function(){
    //* Buscamos si hay registros en la base de datos
    Genre.findAndCountAll()
    .then(result =>{
        //* si no hay hacemos petitcion a la API
        if(result.count === 0){
            fetch(`https://api.rawg.io/api/genres?key=${API_KEY}`)
            .then(data => data.json())
            .then(genres =>{
                //* creamos en registro de genero
                genres.results.forEach(element => {
                    Genre.create({
                        id:element.id,
                        name: element.name
                    })
                });
            })
            //* si existe un error en el proceso
            .catch((error) => console.error(error))
        //* Si hay registros enviamos un mensaje
        }else{
            console.log("Genres added: ",result.count)
        } 
    })
    //* si existe un error en el proceso
    .catch(error => console.error(error));
}

module.exports = addGenres;