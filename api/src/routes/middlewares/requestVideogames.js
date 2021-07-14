const { Op } = require("sequelize");
const { Videogame, Genre } = require('../../db.js');


const requestVideogame = async(req,res,next)=> {
    //numero de videojuegos
    let numOfGames = await Videogame.count();
    // buscar por nombre de videojuego
    if(req.query.hasOwnProperty("name")){
        let { name } = req.query;
        Videogame.findAll({
            attributes: ['id','name', 'background_image', 'rating'],
            include : Genre,
            where: {
                name:{
                    [Op.iLike]: `%${name}%`,
                }
            }
        })
        .then(result => {
            result.length === 0? res.status(422).send({details: "The video game dont exist"}): res.send({count : numOfGames, results : result})
        })
        .catch(error => console.error(error))
    //filtrar por genero    
    }else if(req.query.hasOwnProperty("genre")){
        let { genre } = req.query;
        Videogame.findAll({
            attributes: ['id','name', 'background_image', 'rating'],
            include:{
                model: Genre,
                where:{
                    name:{
                        [Op.iLike] : `%${genre}%`
                    }
                    
                }
            }
        })
        .then(result => res.send({count : numOfGames, results : result}))
        .catch(error => console.error(error));

    // filtar en forma asc o desc por nombre y por rating
    }else if(req.query.hasOwnProperty("order") && req.query.hasOwnProperty("way")){
        let { order, way} = req.query;
        Videogame.findAll({
            attributes: ['id','name', 'background_image', 'rating'],
            include: Genre,
            order: [[order,way]]
        })
        .then(result => res.send({count : numOfGames, results : result}))
        .catch(error => console.error(error));

    // filtro por videojuego creado y no creado
    }else if(req.query.hasOwnProperty("status")){
        let { status } = req.query;
        Videogame.findAll({
            attributes: ['id','name', 'background_image', 'rating'],
            include :Genre,
            where:{
                status: status
            }
        })
        .then(result => res.send({count : result.count, results : result}))
        .catch(error => console.error(error));

    // buscar todos los video juegos de la base de datos
    }else{
        Videogame.findAll({
            attributes: ['id','name', 'background_image', 'rating'],
            include :Genre,
        })
        .then(result => res.send({count : numOfGames, results : result}))
        .catch(error => console.error(error));
        
        
    }  
}
module.exports = {
    requestVideogame
}