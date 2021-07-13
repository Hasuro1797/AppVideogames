require('dotenv').config();
const {API_KEY} = process.env;
const fetch = require('node-fetch');
const { Videogame } = require('../../db.js');

// Agregamos los video juegos desde la API
const addVideogames = () => {
    // Verificamos si hay registros en la base de datos
    Videogame.findAndCountAll()
    .then(result =>{
        // si no hay registros en la base de datos
        if(result.count === 0){
            //Voy a buscar los video juegos por pagina
            for (let page = 1; page < 6; page++) {
                fetch(`https://api.rawg.io/api/games?key=${API_KEY}&page=${page}`)
                .then(data => data.json())
                .then(videogames =>{
                    //Voy agregando los video juegos por pagina (20 video juegos por pagina)
                    videogames.results.forEach(element => {
                        // hago una request por id a la API ya que el primer link no tenia la descripcion del video juego
                        fetch(`https://api.rawg.io/api/games/${element.id}?key=${API_KEY}`)
                        .then(data => data.json())
                        .then(videogame =>{
                            // Defino los array de idsGneros / idssPlatforms
                            let genresId =[];
                            let platformsId = [];
                            //Agrego los id de plataformas del video juego en un array  
                            videogame.platforms.forEach(element => platformsId.push(element.platform.id));
                            //Agrego los id de genero de los generos del video juego en un array
                            videogame.genres.forEach(element => genresId.push(element.id));
                            //creo el video juego 
                            Videogame.create({
                                name: element.name,
                                released: element.released,
                                rating: element.rating,
                                background_image: element.background_image,
                                description: videogame.description
                            })
                            .then(videogameCreated =>{
                                // Relaciono el video juego creado con el array de ids de los generos 
                                videogameCreated.addGenres(genresId)
                                .then(()=>{
                                    // Relaciono el video juego creado con el array de ids de las plataformas
                                    videogameCreated.addPlatforms(platformsId)
                                })
                            }).catch(error => console.error("Error in references:", error))
                        })
                        ""
                        .catch(error => console.error("Request id failed",error))
                    });
                })
                // si existe un error en el proceso de la API
                .catch(error => console.error("Request page failed: ",error))
                
            }
        // Si ya hay registros en la base de datos
        }else{
            console.log("Video games were added.")
        }
    })
    // si existe un error en el proceso
    .catch(error => console.error(error))
}

module.exports = addVideogames;