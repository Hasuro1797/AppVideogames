require('dotenv').config();
const {API_KEY} = process.env;
const fetch = require('node-fetch');
const { Genre } = require('../../db.js');

const addGenres = function(){
    Genre.findAndCountAll()
    .then(result =>{
        if(result.count === 0){
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
}

module.exports = addGenres;