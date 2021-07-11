const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
// ID: * No puede ser un ID de un videojuego ya existente en la API rawg
// Nombre *
// Descripción *
// Fecha de lanzamiento
// Rating
// Plataformas *
// TODO: PENSAR COMO TENER UN ID SIN COLISIONAR
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    // id : {
    //   type: DataTypes.STRING,
    //   unique : true,
    //   primaryKey: true,
    // },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description:{
      type: DataTypes.TEXT,
      allowNull : false
    },
    released:{
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isDate: true
      }
    },
    rating:{
      type : DataTypes.INTEGER,
      allowNull: true
    }
  },{
    timestamps: false,
  });
};
