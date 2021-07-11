require('dotenv').config();
const express = require('express');
const router = express.Router();
const {API_KEY} = process.env;
const fetch = require('node-fetch');


router.get('/:idVideogame',function(req,res){
    //consigo el id del video juego
    const { idVideogame } = req.params;

    fetch(`https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`)
        .then(data => data.json())
        .then(data =>{
            if(data.detail !== "Not found."){
                const videoGame = {};
                videoGame.id = data.id;
                videoGame.name = data.name;
                videoGame.image = data.background_image;
                videoGame.released = data.released;
                videoGame.rating = data.rating;
                videoGame.genres = data.genres;
                videoGame.description = data.description || data.description_raw;
                videoGame.platforms = data.platforms || data.parent_platforms;
                res.send(videoGame);
            }else {
                res.send({
                    error: `The user with id ${idVideogame} dont exist`
                });
            }
        })
        .catch(error => res.status(401));
})

module.exports = router;