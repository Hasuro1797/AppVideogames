const { Videogame, Genre, Platform} = require('../../db.js');


const requestById = (req,res,next) =>{
    const { idVideogame } = req.params;
    console.log("el idvideogame es",req.params.idVideogame)
    console.log("es string?", typeof idVideogame === "string");
    console.log("es entero", typeof idVideogame === "number");
    
    // Busco el id en la base de datos
    Videogame.findByPk(idVideogame,{
        attributes: ['id','name', 'background_image', 'rating','released','description'],
        include: [Genre, Platform],
    })
    .then(videogame => {res.send(videogame)})
    .catch(error => console.error("Error request by id: ", error));
}
module.exports = {
    requestById
}