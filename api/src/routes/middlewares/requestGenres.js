const { Genre } = require('../../db.js');
// middleware para peticiones get
const requestGenres = (req,res,next) =>{
    Genre.findAll()
    // Si todo se ejecuto bien
    .then(genres => res.send(genres))
    //Si hubo algun error
    .catch(error =>{
        console.error(error);
    })
}


module.exports = {
    requestGenres
}