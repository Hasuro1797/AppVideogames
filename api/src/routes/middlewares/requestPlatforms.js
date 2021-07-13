const { Platform } = require('../../db.js');

const requestPlatforms = (req,res,next) =>{
    Platform.findAll()
    // Si se ontuvieron las plataformas con exito
    .then(platforms => res.send(platforms))
    // Si hubo algun error en eñ proceso
    .catch(error=>{
        console.error(error);
        res.status(500).sen(error);
    })
}


module.exports = {
    requestPlatforms
}