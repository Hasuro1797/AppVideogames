const { Op } = require("sequelize");
const { Videogame, Genre } = require('../../db.js');


const requestVideogame = async(req,res,next)=> {
    //numero de videojuegos
    let numOfGames = await Videogame.count();
    // buscar por nombre de videojuego
    console.log("la query es",req.query)
    let page = Number(req.query.page) || 1;
    const name = req.query.name;
    const genre = req.query.genre || null;
    const status = req.query.status || null;
    const order = req.query.order || null;
    const way = req.query.way || null;
    //*page
    //*name
    //*genre
    //*status
    //*order
    //*way
    if(name && order && way){
        Videogame.findAndCountAll({
            offset:(page - 1) * 15, 
            limit: 15,
            attributes: ['id','name', 'background_image', 'rating'],
            include : Genre,
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
                page : page,
                results : result.rows,
                actualEndPoint : `http://localhost:3001/videogames?page=${page}&name=${name.replace(/ /g, "%20")}&order=${order}&way=${way}`,
            })
        })
        .catch(error => console.error(error))
    }else if(name){
        Videogame.findAndCountAll({
            offset:(page - 1) * 15, 
            limit: 15,
            attributes: ['id','name', 'background_image', 'rating'],
            include : Genre,
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
                page : page,
                results : result.rows,
                actualEndPoint : `http://localhost:3001/videogames?page=${page}&name=${name.replace(/ /g, "%20")}`,
            })
        })
        .catch(error => console.error(error))
    }else if(genre && order && way){
        Videogame.findAndCountAll({
            offset:(page - 1) * 15, 
            limit: 15,
            attributes: ['id','name', 'background_image', 'rating'],
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
            page : page,
            results : result.rows,
            actualEndPoint : `http://localhost:3001/videogames?page=${page}&genre=${genre}&order=${order}&way=${way}`
        }))
        .catch(error => console.error(error));

    }else if(genre){
        Videogame.findAndCountAll({
            offset:(page - 1) * 15, 
            limit: 15,
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
    }else if(status && order && way){
        Videogame.findAndCountAll({
            offset:(page - 1) * 15, 
            limit: 15,
            attributes: ['id','name', 'background_image', 'rating'],
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
            page : page, 
            results : result.rows,
            actualEndPoint : `http://localhost:3001/videogames?page=${page}&status=${status.replace(/ /g, "%20").toLowerCase()}&order=${order}&way=${way}`
        }))
        .catch(error => console.error(error));

    }else if(status){
        Videogame.findAndCountAll({
            offset:(page - 1) * 15, 
            limit: 15,
            attributes: ['id','name', 'background_image', 'rating'],
            include :Genre,
            where:{
                status: {
                    [Op.iLike] : `%${status}%`
                }
            }
        })
        .then(result => res.send({
            count : result.count, 
            page : page, 
            results : result.rows,
            actualEndPoint : `http://localhost:3001/videogames?page=${page}&status=${status.replace(/ /g, "%20").toLowerCase()}`
        }))
        .catch(error => console.error(error));

    }else if(order && way){
        Videogame.findAll({
            offset:(page - 1) * 15, 
            limit: 15,
            attributes: ['id','name', 'background_image', 'rating'],
            include :Genre,
            order:[[order,way]]
        })
        .then(result => res.send({
            count : numOfGames,
            page : page, 
            results : result,
            actualEndPoint : `http://localhost:3001/videogames?page=${page}&order=${order}&way=${way}`
        }))
        .catch(error => console.error(error));
    }else{
        Videogame.findAll({
            offset:(page - 1) * 15, 
            limit: 15,
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
    
    // if(req.query.hasOwnProperty("name")){
    //     let { name } = req.query;
    //     //let nameEndPoint = name.replace(" ","%20")
    //     Videogame.findAndCountAll({
    //         offset:(page - 1) * 20, 
    //         limit: 20,
    //         attributes: ['id','name', 'background_image', 'rating'],
    //         include : Genre,
    //         where: {
    //             name:{
    //                 [Op.iLike]: `%${name}%`,
    //             }
    //         }
    //     })
    //     .then(result => {
    //         result.rows.length === 0? res.status(422).send({details: "The video game dont exist"})
    //         : res.send({
    //             count : result.count, 
    //             page : page,
    //             results : result.rows,
    //             actualEndPoint : `http://localhost:3001/videogames?page=${page}&name=${name.replace(/ /g, "%20")}`,
    //         })
    //     })
    //     .catch(error => console.error(error))

    // //filtrar por genero    
    // }else if(req.query.hasOwnProperty("genre")){
    //     let { genre } = req.query;
    //     Videogame.findAndCountAll({
    //         offset:(page - 1) * 20, 
    //         limit: 20,
    //         attributes: ['id','name', 'background_image', 'rating'],
    //         include:{
    //             model: Genre,
    //             where:{
    //                 name:{
    //                     [Op.iLike] : `%${genre}%`
    //                 }
                    
    //             }
    //         }
    //     })
    //     .then(result => res.send({
    //         count : result.count,
    //         page : page,
    //         results : result.rows,
    //         actualEndPoint : `http://localhost:3001/videogames?page=${page}&genre=${genre}`
    //     }))
    //     .catch(error => console.error(error));

    // // filtar en forma asc o desc por nombre y por rating
    // }else if(req.query.hasOwnProperty("order") && req.query.hasOwnProperty("way")){
    //     let { order, way} = req.query;
    //     Videogame.findAndCountAll({
    //         offset:(page - 1) * 20, 
    //         limit: 20,
    //         attributes: ['id','name', 'background_image', 'rating'],
    //         include: Genre,
    //         order: [[order,way]]
    //     })
    //     .then(result => res.send({
    //         count : result.count, 
    //         page : page, 
    //         results : result.rows,
    //         actualEndPoint : `http://localhost:3001/videogames?page=${page}&order=${order}&way=${way}`
    //     }))
    //     .catch(error => console.error(error));

    // // filtro por videojuego creado y no creado
    // }else if(req.query.hasOwnProperty("status")){
    //     let { status } = req.query;
    //     Videogame.findAndCountAll({
    //         offset:(page - 1) * 20, 
    //         limit: 20,
    //         attributes: ['id','name', 'background_image', 'rating'],
    //         include :Genre,
    //         where:{
    //             status: status
    //         }
    //     })
    //     .then(result => res.send({
    //         count : result.count, 
    //         page : page, 
    //         results : result.rows,
    //         actualEndPoint : `http://localhost:3001/videogames?page=${page}&status=${status}`
    //     }))
    //     .catch(error => console.error(error));
        
    // // buscar todos los video juegos de la base de datos
    // }else{
    //     Videogame.findAll({
    //         offset:(page - 1) * 20, 
    //         limit: 20,
    //         attributes: ['id','name', 'background_image', 'rating'],
    //         include :Genre,
    //     })
    //     .then(result => res.send({
    //         count : numOfGames,
    //         page : page, 
    //         results : result,
    //         actualEndPoint : `http://localhost:3001/videogames?page=${page}`
    //     }))
    //     .catch(error => console.error(error));
        
        
    // }  
}
module.exports = {
    requestVideogame
}