require('dotenv').config();
const {API_KEY} = process.env;
const fetch = require('node-fetch');
const { Videogame, Genre, Platform} = require('../../db.js');


const requestById = (req,res,next) =>{
    const { idVideogame } = req.params;
    // Busco el id en la base de datos
    let requestDB = Videogame.findByPk(idVideogame,{
        include: [Genre, Platform],
    });
    //Busco el id en la API
    let requestAPI = fetch(`https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`).then(data => data.json());
    // Hago una ejecucion en paralelo
    Promise.all([requestDB,requestAPI])
    .then(results =>{
        if( results[0] && requestAPI[1].hasOwnProperty("id")){
            res.send(results);
        }else if(results[0]){
            res.send(results[0]);
        }else if (requestAPI[1].hasOwnProperty("id")){
            let videoGame = {};
            videoGame.id = results[1].id;
            videoGame.name = results[1].name;
            videoGame.background_image = results[1].background_image;
            videoGame.released = results[1].released;   
            videoGame.rating = results[1].rating;
            videoGame.genre = results[1].genres;
            videoGame.description = results[1].description || results[1].description_raw;
            videoGame.platform = results[1].platforms || results[1].parent_platforms;
            res.send(videoGame);
        }else{
            res.status(401).send({error: `Dont exist the videogame.`})
        }
    })
    .catch(error =>{
        throw Error("error en la requestById:" + error)
    })
}
module.exports = {
    requestById
}