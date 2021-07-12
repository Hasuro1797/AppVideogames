const express = require('express');
const router = express.Router();
//const { Op } = require("sequelize");
//const db = require('../db.js');
const { Videogame, Genre } = require('../db.js');


router.get('/:idVideogame',function(req,res){
    //consigo el id del video juego
    const { idVideogame } = req.params;

    Videogame.findByPk(idVideogame,{
        include: Genre
    })
    .then(videogame =>{

        videogame? res.send(videogame) : res.status(401).send({error: `Dont exist the videogame.`});
    })

})


router.post('/',async function(req,res){

    const { name, description, released, rating, genres, platform } = req.body;
    // los genres deben ser los ids de los generos y platform tambien tienen que ser sus ids
    try {
        if(name){
            // const genresSearched = await Genre.findAll({
            //     where:{
            //         name: {
            //             [Op.in] : genres
            //         }
            //     }
            // })
            const videoGameCreated = await Videogame.create({
                name,
                description,
                released,
                rating
            })
            await videoGameCreated.addGenres(genres);
            await videoGameCreated.addPlatforms(platform);
            // await Promise.all(genresSearched.map(genre =>{
            //     return genre.addVideogame(videoGameCreated)
            // }))
            res.send({message: `Video game created with success`});
        }else{
            res.status(422).send({error: "Did not receive enough data to create new videogame"});
        }
    } catch (error) {
        console.error(error);
    }

})

module.exports = router;