require('dotenv').config();
const express = require('express');
const router = express.Router();
const {API_KEY} = process.env;
const fetch = require('node-fetch');

router.get('/',function(req,res){
    const {name} = req.query;
    if(name){
        fetch(`https://api.rawg.io/api/games?search=${name}&&key=${API_KEY}`)
        .then((data) => data.json())
        .then(data => {

            if (data.results.length > 0){
                let videogames = data.results.slice(0,15);
                res.send(videogames);
            }else{
                res.status(401).send({
                    error : `The videogame dont exist`
                })
            }
        })
        .catch(error =>res.status(401));

    }else{
        fetch(`https://api.rawg.io/api/games?key=${API_KEY}`)
        .then(data => data.json())
        .then(data =>{
            let videogames = data.results.slice(0,15);
            res.send(videogames);
        })
        .catch(error => res.status(401));
    }
})

module.exports = router;