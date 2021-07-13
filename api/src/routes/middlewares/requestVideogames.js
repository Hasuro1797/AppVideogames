require('dotenv').config();
const {API_KEY} = process.env;
const fetch = require('node-fetch');
const { Op } = require("sequelize");
const { Videogame, Genre } = require('../../db.js');


const requestVideogame = (req,res,next)=> {
    // Obtengo el nombre de la query
    const {name} = req.query;
    // si se envio con una query
    if(name){
        let requestDB = Videogame.findAll({
            attributes: ['name', 'background_image', 'rating'],
            include : Genre,
            where: {
                name:{
                    [Op.iLike]: `%${name}%`,
                }
            }
        })
        let requestAPI = fetch(`https://api.rawg.io/api/games?search=${name}&&key=${API_KEY}`)
        .then((data) => data.json());

        Promise.all([requestDB,requestAPI])
        .then(data =>{
            let videoGames = [data[0]];
            if(data[0].length !== 0 || data[1].results.length !== 0){
                data[1].results.forEach(element => {
                    videoGames.push	({
                        name : element.name,
                        background_image : element.background_image,
                        rating: element.rating,
                        genre: element.genres
                    })
                });
                res.send(videoGames.flat())
            }else{
                res.send([{error: `The videogame ${name} dont exist`}]);
            }
        })
        .catch(error => {
            throw Error(error)
        })
    }else{
        // Buscar los juegos de la base de datos
        let requestDB = Videogame.findAll({
            attributes: ['name', 'background_image', 'rating'],
            include : Genre,
        })
        let requestAPI = fetch(`https://api.rawg.io/api/games?key=${API_KEY}`)
        .then(data => data.json())

        Promise.all([requestDB,requestAPI])
        .then(results =>{
            let videoGames = [results[0]];
            results[1].results.forEach(element => {
                videoGames.push	({
                    name : element.name,
                    background_image : element.background_image,
                    rating: element.rating,
                    genre: element.genres
                })
            });
            res.send(videoGames.flat())
        })
        
    }  
}
module.exports = {
    requestVideogame
}