const { Op } = require("sequelize");
const { Videogame, Genre } = require('../../db.js');


const requestVideogame = async(req,res,next)=> {
    
    //* buscar por nombre de videojuego
    let page = Number(req.query.page) || 1;
    const name = req.query.name;
    const genre = req.query.genre || null;
    const status = req.query.status || null;
    const order = req.query.order || null;
    const way = req.query.way || null;
    const limit = 15;
    
    // *Si se requiere por el nombre y en algun tipo de orden
    if(name && order && way){
        Videogame.findAndCountAll({
            distinct: true,
            offset:(page - 1) * limit, 
            limit: limit,
            attributes: ['id','name', 'background_image','released','rating'],
            include : {
                model: Genre,
            },
            where: {
                name:{
                    [Op.iLike]: `%${name}%`,
                }
            },
            order:[[order,way]]
        })
        .then(result => {
            result.rows.length === 0? res.status(422).send({details: "The video game dont exist",results: result.rows})
            : res.send({
                count : result.count, 
                pages: Math.ceil(result.count / limit),
                page : page,
                results : result.rows,
                actualEndPoint : `http://localhost:3001/videogames?page=${page}&name=${name.replace(/ /g, "%20").toLowerCase()}&order=${order}&way=${way}`,
            })
        })
        .catch(error => console.error(error))

    //* Si la request solo es con el nombre
    }else if(name){
        Videogame.findAndCountAll({
            distinct: true,
            offset:(page - 1) * limit, 
            limit: limit,
            attributes: ['id','name', 'background_image','released', 'rating'],
            include :{
                model:Genre,
            },
            where: {
                name:{
                    [Op.iLike]: `%${name}%`,
                }
            }
        })
        .then(result => {
            result.rows.length === 0? res.status(422).send({details: "The video game dont exist",results:result.rows})
            : res.send({
                count : result.count, 
                pages: Math.ceil(result.count / limit),
                page : page,
                results : result.rows,
                actualEndPoint : `http://localhost:3001/videogames?page=${page}&name=${name.replace(/ /g, "%20").toLowerCase()}`,
            })
        })
        .catch(error => console.error(error))

    // *Si la request es sobre el genero con algun tipo de orden
    }else if(genre && order && way){
        Videogame.findAndCountAll({
            offset:(page - 1) * limit, 
            limit: limit,
            attributes: ['id','name', 'background_image','released', 'rating'],
            include:{
                model: Genre,
                where:{
                    name:{
                        [Op.iLike] : `%${genre}%`
                    }
                    
                },
                
            },
            order: [[order,way]]
        })
        .then(result => res.send({
            count : result.count,
            pages: Math.ceil(result.count / limit ),
            page : page,
            results : result.rows,
            actualEndPoint : `http://localhost:3001/videogames?page=${page}&genre=${genre}&order=${order}&way=${way}`
        }))
        .catch(error => console.error(error));
    //* Si la request es solo del gerero
    }else if(genre){
        Videogame.findAndCountAll({
            offset:(page - 1) * limit, 
            limit: limit,
            attributes: ['id','name', 'background_image','released', 'rating'],
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
            pages: Math.ceil(result.count / limit ),
            page : page,
            results : result.rows,
            actualEndPoint : `http://localhost:3001/videogames?page=${page}&genre=${genre}`
        }))
        .catch(error => console.error(error));

    //* Si la request por juegos de la plataforma / juegos creados en aulgun tipo de orden
    }else if(status && order && way){
        Videogame.findAndCountAll({
            distinct: true,
            offset:(page - 1) * limit, 
            limit:limit,
            attributes: ['id','name', 'background_image','released', 'rating'],
            include :Genre,
            where:{
                status: {
                    [Op.iLike] : `%${status}%`
                }
            },
            order:[[order,way]]
        })
        .then(result => res.send({
            count : result.count,
            pages: Math.ceil(result.count / limit ), 
            page : page, 
            results : result.rows,
            actualEndPoint : `http://localhost:3001/videogames?page=${page}&status=${status.replace(/ /g, "%20").toLowerCase()}&order=${order}&way=${way}`
        }))
        .catch(error => console.error(error));

    //* Si la request por juegos de la plataforma / juegos creados
    }else if(status){
        Videogame.findAndCountAll({
            distinct:true,
            offset:(page - 1) * limit, 
            limit: limit,
            attributes: ['id','name', 'background_image','released', 'rating'],
            include :Genre,
            where:{
                status: {
                    [Op.iLike] : `%${status}%`
                }
            }
        })
        .then(result => res.send({
            count : result.count,
            pages: Math.ceil(result.count / limit ), 
            page : page, 
            results : result.rows,
            actualEndPoint : `http://localhost:3001/videogames?page=${page}&status=${status.replace(/ /g, "%20").toLowerCase()}`
        }))
        .catch(error => console.error(error));

    //* Si la request no tiene filtros y se requiere en algun orden
    }else if(order && way){
        Videogame.findAndCountAll({
            distinct: true,
            offset:(page - 1) * limit, 
            limit: limit,
            attributes: ['id','name', 'background_image','released', 'rating'],
            include :Genre,
            order:[[order,way]]
        })
        .then(result => res.send({
            count : result.count,
            pages: Math.ceil(result.count / limit),
            page : page, 
            results : result.rows,
            actualEndPoint : `http://localhost:3001/videogames?page=${page}&order=${order}&way=${way}`
        }))
        .catch(error => console.error(error));
    //* Si la request no tiene filtros
    }else{
        Videogame.findAndCountAll({
            distinct: true,
            offset:(page - 1) * limit, 
            limit: limit,
            attributes: ['id','name', 'background_image','released', 'rating'],
            include :Genre,
        })
        .then(result => res.send({
            count : result.count,
            pages: Math.ceil(result.count / limit),
            page : page, 
            results : result.rows,
            actualEndPoint : `http://localhost:3001/videogames?page=${page}`
        }))
        .catch(error => console.error(error));
    }
}
module.exports = {
    requestVideogame
}