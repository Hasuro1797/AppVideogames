const { Op } = require("sequelize");
const { Videogame, Genre } = require('../../db.js');


const requestVideogame = async(req,res,next)=> {
    //numero de videojuegos
    let numOfGames = await Videogame.count();
    // buscar por nombre de videojuego
    let page = Number(req.query.page) || 0; 
    if(req.query.hasOwnProperty("name")){
        let { name } = req.query;
        //let nameEndPoint = name.replace(" ","%20")
        Videogame.findAndCountAll({
            offset:page * 20, 
            limit: 20,
            attributes: ['id','name', 'background_image', 'rating'],
            include : Genre,
            where: {
                name:{
                    [Op.iLike]: `%${name}%`,
                }
            }
        })
        .then(result => {
            result.rows.length === 0? res.status(422).send({details: "The video game dont exist"})
            : res.send({
                count : result.count, 
                page : page + 1,
                results : result.rows,
                actualEndPoint : `http://localhost:3001/videogames?page=${page}&name=${name.replace(/ /g, "%20")}`,
            })
        })
        .catch(error => console.error(error))

    //filtrar por genero    
    }else if(req.query.hasOwnProperty("genre")){
        let { genre } = req.query;
        Videogame.findAndCountAll({
            offset:page * 20, 
            limit: 20,
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
        .then(result => res.send({
            count : result.count,
            page : page,
            results : result.rows,
            actualEndPoint : `http://localhost:3001/videogames?page=${page}&genre=${genre}`
        }))
        .catch(error => console.error(error));

    // filtar en forma asc o desc por nombre y por rating
    }else if(req.query.hasOwnProperty("order") && req.query.hasOwnProperty("way")){
        let { order, way} = req.query;
        Videogame.findAndCountAll({
            offset:page * 20, 
            limit: 20,
            attributes: ['id','name', 'background_image', 'rating'],
            include: Genre,
            order: [[order,way]]
        })
        .then(result => res.send({
            count : result.count, 
            page : page, 
            results : result.rows,
            actualEndPoint : `http://localhost:3001/videogames?page=${page}&order=${order}&way=${way}`
        }))
        .catch(error => console.error(error));

    // filtro por videojuego creado y no creado
    }else if(req.query.hasOwnProperty("status")){
        let { status } = req.query;
        Videogame.findAndCountAll({
            offset:page * 20, 
            limit: 20,
            attributes: ['id','name', 'background_image', 'rating'],
            include :Genre,
            where:{
                status: status
            }
        })
        .then(result => res.send({
            count : result.count, 
            page : page, 
            results : result.rows,
            actualEndPoint : `http://localhost:3001/videogames?page=${page}&status=${status}`
        }))
        .catch(error => console.error(error));
        
    // buscar todos los video juegos de la base de datos
    }else{
        Videogame.findAll({
            offset:page * 20, 
            limit: 20,
            attributes: ['id','name', 'background_image', 'rating'],
            include :Genre,
        })
        .then(result => res.send({
            count : numOfGames,
            page : page, 
            results : result,
            actualEndPoint : `http://localhost:3001/videogames?page=${page}`
        }))
        .catch(error => console.error(error));
        
        
    }  
}
module.exports = {
    requestVideogame
}