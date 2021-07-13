const { Videogame } = require('../../db.js');

const createVideoGame = async(req,res,next) =>{
    // Recibo el body con los datos 
    const { name, description, released, rating, genres, platform, background_image } = req.body;
    try {
        if(name && description && platform && background_image && genres){
            if(platform.length > 0){
                // Creo el el Video juego
                const videoGameCreated = await Videogame.create({
                    name,
                    released,
                    rating,
                    background_image,
                    description
                })
                // Agregamos las referencias al juego creado
                await videoGameCreated.addGenres(genres);
                await videoGameCreated.addPlatforms(platform);
                // Mostramos un mnesaje de exito cuando se creo el video juego
                res.send({message: `Video game created with success`});
            }else{
                // Si no exite elemento en el array
                res.status(422).send({error: "Did not receive data over platforms"})
            }
        }else{
            // Respondemos un mensaje diciendo que los datos ingresados no son suficientes
            res.status(422).send({error: "Did not receive enough data to create new videogame"});
        }
    } catch (error) {
        console.error(error);
    }
    
}
module.exports = {
    createVideoGame
}