const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
// ID
// Nombre
module.exports = (sequelize) => {
  // defino el modelo
    sequelize.define('genre', {
        name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique : true
        },
    },{
        timestamps: false,
    });
    };