const express = require('express');
const router = express.Router();
const { Videogame } = require('../db.js');

router.get('/',function(req,res){
    const {name} = req.query;
    if(name){
        Videogame.findAll({
            where: {
                name,
            },
            limit: 15
        })
        .then(videoGames => {
            if(videoGames.length === 0){
                res.send({error: `The videogame ${name} dont exist`});
            }else{
                res.send(videoGames)
            }
        })
    }else{
        Videogame.findAll({
            limit: 15
        })
        .then((videoGames)=>{
            res.send(videoGames)
        })
    }   
})

module.exports = router;