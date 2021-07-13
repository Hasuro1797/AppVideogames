const express = require('express');
const router = express.Router();
const { Videogame } = require('../db.js');
// Ryta para obtener los video juegos en la base de datos
router.get('/',function(req,res){
    // Obtengo el nombre de la query
    const {name} = req.query;
    console.log(name);
    // si se envio con una query
    if(name){
        // Buscamos los 15 primeros videojuegos en la base de datos con el nombre ingresado en la query
        Videogame.findAll({
            where: {
                name,
            },
            limit: 15
        })
        // Si el proceso se realizo con exito
        .then(videoGames => {
            // si el nombre ingresado en la query no existe en la base de datos
            if(videoGames.length === 0){
                res.send({error: `The videogame ${name} dont exist`});
            // Si existe en la base de datos
            }else{
                res.send(videoGames)
            }
        })
        // Si el proceso fallo 
        .catch(error => console.error(error));
     // Si no se envio una query   
    }else{
        // Buscar los 15 primeros juegos de la base de datos
        Videogame.findAll({
            limit: 15
        })
        // Si el proceso se realizo con exito
        .then((videoGames)=>{
            res.send(videoGames)
        })
        // Si el proceso fallo 
        .catch(error => console.error(error));
    }   
})

module.exports = router;